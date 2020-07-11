const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp();
const db = admin.firestore();

const getPercent = async (change, context) => {

    const { params: { notesId } } = context
    const snapshot = await db.collection('fields').get();
    let count = 0;
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        if (doc.data().value) count++;
    });
    let percent = 100 * count / 5;
    console.log('percent :', percent)
    return percent;

};

exports.modifyUser = functions.firestore
    .document('fields/{fieldName}')
    .onWrite(getPercent);