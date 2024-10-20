// validationMiddleware.js

export const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            return res.status(400).json({
                
                success: false,
                message: error.details.map(detail => detail.message).join(', ')
            });
        }

        next(); // Proceed to the next middleware or route handler if no errors
    };
};
