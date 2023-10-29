import carModel from '../models/carModel.js';

export const createCar = async(req, res) => {
    try {
        const {brand, sales} = req.body;
        if(!brand || !sales){
            return res.send({error: "all fields are required"});
        }

        const existingCar = await carModel.findOne({brand});
        if(existingCar){
            return res.send({message: "brand already exists"});
        }
        const newCar = new carModel({
            brand, sales
        });
        await newCar.save();

        return res.status(201).send({
            success: true,
            message: "brand successfully created",
            newCar
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: "failed to fetch cars",
            error
        });
    }
}

export const getAll = async(req, res) => {
    try{
        const result = await carModel.find();
        return res.status(200).send({
            success: true,
            message: "cars fetched successfully",
            result
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: "failed to fetch cars",
            error
        });
    }
}

export const getSingle = async(req, res) => {
    try {
        const result = await carModel.findOne({_id:req.params.id})
        // console.log(result);
        if(result){
            return res.status(200).send({
                success: true,
                message: "car fetched",
                result
            });
        } else {
            return res.status(404).send({
                success: true,
                message: "car not found"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "failed to fetch car",
            error
        });
    }
}

export const removeCar = async(req, res) => {
    try {
        // const result = await carModel.findOneAndDelete({email:req.params.email})
        const result = await carModel.findByIdAndDelete({_id:req.params.id})
        return res.status(200).send({
            success: true,
            message: "car deleted successfully",
            result
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "failed to delete car",
            error
        });
    }
}

export const updateCar = async(req, res) => {
    try {
        const {id} = req.params;
        const {brand, sales}  = req.body;

        const result = await carModel.findByIdAndUpdate(id,{
            brand, sales
            }
        );

        return res.status(200).send({
            success: true,
            message: "car updated successfully",
            result
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "failed to update car",
            error
        });
    }
}