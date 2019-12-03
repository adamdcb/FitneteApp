export default {
    getAnimationName(exerciseName, gender) {
        let name = '';
        switch (exerciseName) {
            case 'squats':
                name = '01_Squats';
                break;
            case 'legSwingRightLeg':
                name = '02_Leg_Swing_R';
                break;
            case 'legSwingLeftLeg':
                name = '02_Leg_Swing_L';
                break;
            case 'gluteBridge':
                name = '03_Glute_Bridge';
                break;
            case 'innerThighLiftRightLeg':
                name = '04_Inner_Thigh_Lift_R';
                break;
            case 'innerThighLiftLeftLeg':
                name = '04_Inner_Thigh_Lift_L';
                break;
            case 'sideLegLiftRightLeg':
                name = '05_Side_Leg_Lift_R';
                break;
            case 'sideLegLiftLeftLeg':
                name = '05_Side_Leg_Lift_L';
                break;
            case 'gluteKickbacksRightLeg':
                name = '06_Glute_Kickbacks_R';
                break;
            case 'gluteKickbacksLeftLeg':
                name = '06_Glute_Kickbacks_L';
                break;
            case 'pulsingLungesLeftLeg':
                name = '07_Pulsing_Lunges_L';
                break;
            case 'pulsingLungesRightLeg':
                name = '07_Pulsing_Lunges_R';
                break;
            case 'marchingHip':
                name = '08_Marching_Hip';
                break;
            case 'singleLegHipThrustersRightLeg':
                name = '09_Single_Leg_Hip_Thrusters';
                break;
            case 'singleLegHipThrustersLeftLeg':
                name = '09_Single_Leg_Hip_Thrusters';
                break;
            case 'oneLegBridgeRightLeg':
                name = '10_One_Leg_Bridge_R';
                break;
            case 'oneLegBridgeLeftLeg':
                name = '10_One_Leg_Bridge_L';
                break;
            case 'singleLegDeadliftRightLeg':
                name = '11_Single_Leg_Deadlift_R';
                break;
            case 'singleLegDeadliftLeftLeg':
                name = '11_Single_Leg_Deadlift_L';
                break;
            case 'plank':
                name = '12_Planks';
                break;
            case 'basicCrunches':
                name = '13_Basic_Crunches';
                break;
            case 'mountainClimbers':
                name = '14_Mountain_Climbers';
                break;
            case 'rollup':
                name = '15_Rollup';
                break;
            case 'windshield':
                name = 'windshield'; // TODO
                break;
            case 'reverseCrunchStraight':
                name = '17_Reverse_Crunch_Straight';
                break;
            case 'commandos':
                name = '19_Commandos';
                break;
            case 'doubleLegLift':
                name = '20_Double_Leg_Lift';
                break;
            case 'doubleLegReach':
                name = '21_Double_Leg_Reach';
                break;
            case 'armPlankWithKnees':
                name = '22_Arm_Plank_with_Knees';
                break;
            case 'boatpose':
                name = '23_Boat_pose';
                break;
            case 'reverseJackKnives':
                name = '24_Jack_Knives';
                break;
            case 'cobraPushUp':
                name = '25_Cobra_Push_Up';
                break;
            case 'oneArmPushUpRightArm':
                name = '26_One_Arm_Push_Up_R';
                break;
            case 'oneArmPushUpLeftArm':
                name = '26_One_Arm_Push_Up_L';
                break;
            case 'handPlankReaches':
                name = '27_Hand_Plank_Reaches';
                break;
            case 'plankRightSide':
                name = 'plankRightSide'; // TODO
                break;
            case 'plankLeftSide':
                name = 'plankLeftSide'; // TODO
                break;
            case 'kneePushUps':
                name = '29_Knee_Push_Ups';
                break;
            case 'shouldPushUps':
                name = 'shouldPushUps'; // TODO
                break;
            case 'pushUp':
                name = '30_Push_Ups';
                break;
            case 'bentOverRow':
                name = '31_Bent_Over_Row';
                break;
            case 'lateralRaises':
                name = '32_Lateral_Raise';
                break;
            case 'tricepExtension':
                name = '33_Tricep_Extension_R';
                break;
            case 'dumbellSwing':
                name = 'dumbellSwing'; // TODO
                break;
            case 'squatandCurl':
                name = 'squatandCurl'; // TODO
                break;
            case 'tricepKickback':
                name = 'tricepKickback'; // TODO
                break;
            case 'plankHipDips':
                name = 'plankHipDips'; // TODO
                break;
            case 'crabWalk':
                name = 'crabWalk'; // TODO
                break;
            case 'lyingKneeHug':
                name = 'lyingKneeHug'; // TODO
                break;
            case 'woodpecker':
                name = 'woodpecker'; // TODO
                break;
            case 'rollingOver':
                name = 'rollingOver'; // TODO
                break;
            case 'runnersCrunch':
                name = 'runnersCrunch'; // TODO
                break;
            case 'theFounder':
                name = 'theFounder'; // TODO
                break;
            case 'kneelingObliqueCrunch':
                name = 'kneelingObliqueCrunch'; // TODO
                break;
            case 'mcGillCurlUp':
                name = 'mcGillCurlUp'; // TODO
                break;
            case 'birdDog':
                name = 'birdDog'; // TODO
                break;
            case 'tricepDip':
                name = 'tricepDip'; // TODO
                break;
            case 'wallSit':
                name = 'wallSit'; // TODO
                break;
            case 'jumpingJacks':
                name = 'jumpingJacks'; // TODO
                break;
            case 'burpees':
                name = 'burpees'; // TODO
                break;
            default:
                name = 'unknown';
                break;
        }
        return name ? `${name}_${gender}` : '';
    }
}