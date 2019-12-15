const ANIMATION_NAME = {
    squats: '01_Squats',
    legSwingRightLeg: '02_Leg_Swing_R',
    legSwingLeftLeg: '02_Leg_Swing_L',
    gluteBridge: '03_Glute_Bridge',
    innerThighLiftRightLeg: '04_Inner_Thigh_Lift_R',
    innerThighLiftLeftLeg: '04_Inner_Thigh_Lift_L',
    sideLegLiftRightLeg: '05_Side_Leg_Lift_R',
    sideLegLiftLeftLeg: '05_Side_Leg_Lift_L',
    gluteKickbacksRightLeg: '06_Glute_Kickbacks_R',
    gluteKickbacksLeftLeg: '06_Glute_Kickbacks_L',
    pulsingLungesLeftLeg: '07_Pulsing_Lunges_L',
    pulsingLungesRightLeg: '07_Pulsing_Lunges_R',
    marchingHip: '08_Marching_Hip',
    singleLegHipThrustersRightLeg: '09_Single_Leg_Hip_Thrusters',
    singleLegHipThrustersLeftLeg: '09_Single_Leg_Hip_Thrusters',
    oneLegBridgeRightLeg: '10_One_Leg_Bridge_R',
    oneLegBridgeLeftLeg: '10_One_Leg_Bridge_L',
    singleLegDeadliftRightLeg: '11_Single_Leg_Deadlift_R',
    singleLegDeadliftLeftLeg: '11_Single_Leg_Deadlift_L',
    plank: '12_Planks',
    basicCrunches: '13_Basic_Crunches',
    mountainClimbers: '14_Mountain_Climbers',
    rollup: '15_Rollup',
    windshield: '', // TODO
    reverseCrunchStraight: '17_Reverse_Crunch_Straight',
    commandos: '19_Commandos',
    doubleLegLift: '20_Double_Leg_Lift',
    doubleLegReach: '21_Double_Leg_Reach',
    armPlankWithKnees: '22_Arm_Plank_with_Knees',
    boatpose: '23_Boat_pose',
    reverseJackKnives: '24_Jack_Knives',
    cobraPushUp: '25_Cobra_Push_Up',
    oneArmPushUpRightArm: '26_One_Arm_Push_Up_R',
    oneArmPushUpLeftArm: '26_One_Arm_Push_Up_L',
    handPlankReaches: '27_Hand_Plank_Reaches',
    plankRightSide: '', // TODO
    plankLeftSide: '', // TODO
    kneePushUps: '29_Knee_Push_Ups',
    shouldPushUps: '', // TODO
    pushUp: '30_Push_Ups',
    bentOverRow: '31_Bent_Over_Row',
    lateralRaises: '32_Lateral_Raise',
    tricepExtensionRight: '33_Tricep_Extension_R', // FIXME
    tricepExtensionLeft: '33_Tricep_Extension_L', // FIXME
    dumbellSwing: '34_Dumbell_Swing',
    squatAndCurl: '35_Squat_and_Curl',
    tricepKickback: '36_Tricep_Kickback',
    plankHipDips: '', // TODO
    crabWalk: '', // TODO
    spineStretch: '39_Spine_Stretch',
    lyingKneeHug: '40_Lying_Knee_Hug_R', // FIXME
    woodpecker: '41_Woodpecker',
    rollingOver: '42_Rolling_over',
    runnersCrunch: '43_Runner_s_Crunch',
    theFounder: '44_The_Founder',
    kneelingObliqueCrunch: '', // TODO
    mcGillCurlUpRight: '46_McGill_Curl_Up_R', // FIXME
    mcGillCurlUpLeft: '46_McGill_Curl_Up_L', // FIXME
    birdDogRight: '47_Bird_Dog_R', // FIXME
    birdDogLeft: '47_Bird_Dog_L', // FIXME
    tricepDip: '57_Tricep_Dip',
    wallSit: '58_Wall_sit',
    jumpingJacks: '', // TODO
    burpees: '', // TODO
};

export default {
    getAnimationName(exerciseName, gender) {
        const name = ANIMATION_NAME[exerciseName];
        return name ? `${name}_${gender}` : '';
    }
}