import express from  'express';
import { contactus as Model} from '../models/Model.js';
import { contactus } from '../models/Model.js';



const router = express.Router(); 

//Route for save a new feedback
router.post("/", async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.email ||
            !request.body.phone ||
            !request.body.subject ||
            !request.body.message 
        ) {
            return response.status(400).send({
                message: "Send All required fields: firstname,lastname,email,phonenumber,Date,subject,message",
            });
        }
        const newcontactus = {
            name: request.body.name,
            email: request.body.email,
            phone:request.body.phone,
            subject:request.body.subject,
            message:request.body.message,
            
        };
        const contactus = await Model.create(newcontactus);


        return response.status(201).send(contactus);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//Route for get all feedbacks from database 
router.get('/', async (request, response) => {
    try {
        const contactus = await Model.find({});
        return response.status(200).json({
            count: contactus.length,
            data: contactus
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});


//Route for get one reservation from database by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const contactus = await Model.findById(id);
        return response.status(200).json(contactus);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});


//Route for update a feedback
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.email ||
            !request.body.phone ||
            !request.body.subject ||
            !request.body.message 

        ) {
            return response.status(400).send({
                message: 'Send All required fields:firstname,lastname,email,phonenumber,Date,subject,message',
            });
        }

        const { id } = request.params;

        const result = await contactus.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Feedback not found' });
        }

        return response.status(200).send({ message: 'Feedback Updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//Route for delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await contactus.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Feedback not found' });
        }

        return response.status(200).send({ message: 'Feedback deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router;