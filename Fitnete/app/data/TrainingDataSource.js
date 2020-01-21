import FNDatabase from './local-storage/FNDatabase';
import AsyncWrapper from '../utils/utils/AsyncWrapper';

export default class TrainingDataSource {

    getPrograms() {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = FNDatabase.database();
            const objects = db.objects('TrainingProgram');
            const programs = objects.map((program) => ({
                id: program.id,
                type: program.type,
                progress: this._getProgress(program.id, db),
                weeks: program.weeks.map((week) => ({
                    id: week.id,
                    days: week.days.map((day) => ({
                        id: day.id,
                        difficulty: day.difficulty,
                        exercises: day.exercises.map((exercise) => ({
                            id: exercise.id,
                            name: exercise.name,
                            reps: exercise.reps,
                            time: exercise.time,
                            needsGear: exercise.needsGear,
                            completed: exercise.completed
                        }))
                    }))
                }))
            }));
            resolve(programs);
        });
    }

    getAnyProgramDuration() {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = FNDatabase.database();
            const objects = db.objects('TrainingProgram');
            const anyProgram = objects[0];
            const duration = anyProgram ? anyProgram.weeks.length * 7 : 0;
            resolve(duration);
        });
    }

    savePrograms(programs) {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = FNDatabase.database();
            try {
                db.write(() => {
                    programs.forEach((program) => {
                        db.create('TrainingProgram', program, true);
                    });
                });
                resolve(true);
            } catch (e) {
                console.log('savePrograms()', e);
                reject(e);
            }
        });
    }

    deleteAllPrograms() {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = FNDatabase.database();
            try {
                const allPrograms = db.objects('TrainingProgram');
                const allWeeks = db.objects('TrainingWeek');
                const allDays = db.objects('TrainingDay');
                const allExercises = db.objects('TrainingExercise');
                db.write(() => {
                    db.delete(allPrograms);
                    db.delete(allWeeks);
                    db.delete(allDays);
                    db.delete(allExercises);
                });
                resolve(true);
            } catch (e) {
                console.log('deleteAllPrograms()', e);
                reject(e);
            }
        });
    }

    setExerciseStatus(exerciseId, completed) {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = FNDatabase.database();
            try {
                const exercise = db.objectForPrimaryKey('TrainingExercise', exerciseId);
                if (exercise) {
                    db.write(() => {
                        exercise.completed = completed;
                    });
                }
                resolve(true);
            } catch (e) {
                console.log('setExerciseStatus()', e);
                reject(e);
            }
        });
    }

    getAllExerciseNames() {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = FNDatabase.database();
            try {
                const exercises = db.objects('TrainingExercise')
                    .filtered('name != "" DISTINCT(name)');
                const names = exercises.reduce((acc, exercise) => acc.concat(exercise.name), []);
                resolve(names);
            } catch (e) {
                console.log('getUniqueExercises()', e);
                reject(e);
            }
        });
    }

    getProgress(programId) {
        return AsyncWrapper.makeAsync(async (resolve, reject) => {
            const db = FNDatabase.database();
            try {
                const progress = this._getProgress(programId, db);
                resolve(progress);
            } catch (e) {
                console.log('getProgress()', e);
                reject(e);
            }
        });
    }

    _getProgress(programId, db) {
        const completedDays = db.objects('TrainingDay')
            .filtered(`weeks.programs.id = "${programId}" AND (ALL exercises.completed = true)`);
        return completedDays.length;
    }
}