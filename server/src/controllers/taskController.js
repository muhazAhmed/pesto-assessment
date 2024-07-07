import taskModel from "../models/taskModel.js";
import { RESPONSE_MESSAGE } from "../utils/validation.js";

export const createTask = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const fetchOneTask = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const fetchAllTask = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const updateTask = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const deleteTask = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}