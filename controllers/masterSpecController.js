const MasterSpecification = require('../models/MasterSpecification');

exports.createSpecification = async (req, res) => {
    try {
        const spec = new MasterSpecification(req.body);
        await spec.save();
        res.status(201).json(spec);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllSpecifications = async (req, res) => {
    try {
        const specs = await MasterSpecification.find({ isActive: true });
        res.json(specs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSpecificationById = async (req, res) => {
    try {
        const spec = await MasterSpecification.findById(req.params.id);
        if (!spec) return res.status(404).json({ message: 'Specification not found' });
        res.json(spec);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSpecification = async (req, res) => {
    try {
        const spec = await MasterSpecification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!spec) return res.status(404).json({ message: 'Specification not found' });
        res.json(spec);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSpecification = async (req, res) => {
    try {
        const spec = await MasterSpecification.findByIdAndUpdate(req.params.id, { isActive: false });
        if (!spec) return res.status(404).json({ message: 'Specification not found' });
        res.json({ message: 'Specification deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
