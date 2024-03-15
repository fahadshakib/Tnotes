import createNoteInFirestore from "./create-note.utilities";


const notes = [

    {
        title: 'Redux  a predictable state container',
        description: `Redux is a predictable state container for JavaScript apps. It helps manage the state of an application in a single immutable object, simplifying data flow and making state changes predictable. Actions trigger state changes via reducers, enabling efficient management of complex application states. It's widely used in React applications for state management`,
        photo: null,
        createdAt: new Date().toString()
    },
    {
        title: 'Firebase a database which makes life easier',
        description: `Firebase offers real-time database, authentication, hosting, storage, and analytics services, making it popular for building scalable and dynamic applications`,
        photo: null,
        createdAt: new Date().toString()
    },
    {
        title: 'JavaScript frontend frameworks',
        description: `JavaScript frontend frameworks, like React, Angular, and Vue.js, facilitate building interactive user interfaces for web applications. They provide tools for efficient state management, component-based architecture, routing, and seamless integration with backend services, enhancing developer productivity and user experience`,
        photo: null,
        createdAt: new Date().toString()
    },
    {
        title: 'the V8 engine',
        description: `eight cylinders, powerful performance, iconic rumble,used in high-performance cars, trucks, and muscle cars, efficient power delivery`,
        photo: null,
        createdAt: new Date().toString()
    }
];


const uploadSampleNotesInFirestore = async (uid) => {
    try {

        const creationPromises = notes.map(note => createNoteInFirestore(uid, note));
        await Promise.all(creationPromises);

    } catch (error) {throw new Error('error during note upload in database') }
}


export default uploadSampleNotesInFirestore;