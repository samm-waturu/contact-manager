/*
@desc Route requests and responses

 */

/*

@desc:AsyncHandler conducts try catch blocks on all our async routes or
       functions connecting to the DB. This is because DB always return a
        promise
 */

const asyncHandler = require('express-async-handler')

/*
importing CRUD connect from contactModel
 */
const ctMod = require('../models/contactModel')
/*
@desc Get all contacts
@route GET /api/contacts
@access private
 */

const getAll = asyncHandler(async (req, res) => {
    const getAllContacts = await ctMod.find()
    if(getAllContacts === ['']){
        res.status(404)
        throw new Error('No contacts available')
    }
    res.status(200).json({getAllContacts, message: 'Fetch successful!'})
})

/*
@desc Delete all contacts
@route DELETE /api/contacts
@access private
 */

const deleteAll = asyncHandler(async (req, res) => {
    const deleteAllContacts = await ctMod.find()
    if(!deleteAllContacts){
        res.status(404)
        throw new Error('No contacts available')
    }
    const deleting = await ctMod.deleteMany()
    res.status(200).json({deleting, message: "All contacts successfully deleted"})
})

/*
@desc Get ID contact
@route GET /api/contacts/:id
@access private
 */

const getId = asyncHandler(async (req, res) => {
    const getContactById = await ctMod.findById(req.params.id);
    if(!getContactById){
        res.status(404)
        throw new Error('Contact not found')
    } else {
      return res.status(200).json({getContactById, message: `Fetch by Id successful`})
    }

})

/*
@desc Create Contact
@route POST /api/contacts
@access private
 */

const createNew = asyncHandler(async (req, res) => {
    //fetching information from request body
    const {name, email, phone} = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error(`All fields are mandatory`)
    }

    const createNewContact = await ctMod.create({
        name, email, phone
        }
    )
    res.status(201).json({createNewContact, message: `Successfully created new contact`})
})

/*
@desc Update Contact
@route PUT /api/contacts
@access private
 */

const updateId = asyncHandler(async (req, res) => {
    const updateContact = await ctMod.findById(req.params.id)
    if(!updateContact){
        res.status(404);
        throw new Error('Contact not found')
    }
    const updating = await ctMod.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json({updating, message: `Contact successfully updated`})
})

/*
@desc Delete Contacts
@route DELETE /api/contacts
@access private
 */

const deleteId = asyncHandler(async (req, res) => {
    const deleteContact = await ctMod.findById(req.params.id)
    if(!deleteContact){
        res.status(404);
        throw new Error(`Contact not found`)
    }
    const deleting = await ctMod.deleteOne()
    res.status(200).json({ deleting, message: `Contact successfully deleted`})
})

/*
@desc exporting all the declared routes
 */

module.exports = {getAll, deleteAll, createNew, getId, updateId, deleteId}