export function validate(schema) {
    return (req, res, next) => {
      const data = {
        body: req.body,
        query: req.query,
        params: req.params
      };
  
      const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
      };
  
      const { error, value } = schema.validate(data, options);
  
      if (error) {
        const details = error.details.map((d) => d.message);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: details
        });
      }
  
      req.body = value.body;
      req.query = value.query;
      req.params = value.params;
      next();
    };
  }
  