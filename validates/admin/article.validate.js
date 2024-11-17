
const { check, validationResult } = require('express-validator');
const validateArticle = [
    // Title validation
    check('title')
      .notEmpty().withMessage('Title is required')
      .isLength({ min: 8 }).withMessage('Title must be at least 8 characters')
      .isLength({ max: 100 }).withMessage('Title must not exceed 100 characters'),
      
  
    // Content validation  
    check('content')
      .notEmpty().withMessage('Content is required')
      .isLength({ min: 5 }).withMessage('Content must be at least 100 characters')
      .isLength({ max: 20000 }).withMessage('Content is too long'),
  
 
    // Tags validation
    check('tags')
      .optional()
      .custom((value) => {
        if (value) {
          const tags = value.split(',').map(tag => tag.trim());
          const validTagRegex = /^[a-zA-Z0-9\-_]+$/;
          const isValid = tags.every(tag => validTagRegex.test(tag));
          if (!isValid) throw new Error('Tags can only contain letters, numbers, hyphens and underscores');
          if (tags.length > 10) throw new Error('Maximum 10 tags allowed');
          return true;
        }
        return true;
      }),
  
    
  
    // Status validation
    check('status')
      .isIn(['draft', 'published', 'archived']).withMessage('Invalid status'),
  
    // Middleware to handle validation results
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect(req.get('Referrer') || '/');
      }
      next();
    }
  ];
  
  // Security middleware for MongoDB
  const sanitizeArticle = (req, res, next) => {
    // Prevent NoSQL Injection
    const sanitizeValue = (value) => {
      if (typeof value === 'string') {
        // Remove MongoDB operators
        return value.replace(/^\$/, '').trim();
      }
      return value;
    };
  
    // XSS Prevention for text fields
    const sanitizeXSS = (value) => {
      if (typeof value === 'string') {
        return value.replace(/<[^>]*>/g, ''); // Remove HTML tags
      }
      return value;
    };
  
    // Fields to sanitize
    const fieldsToSanitize = ['title', 'author', 'tags'];
    
    fieldsToSanitize.forEach(field => {
      if (req.body[field]) {
        req.body[field] = sanitizeXSS(sanitizeValue(req.body[field]));
      }
    });
  
    next();
  };
  module.exports = {
    validateArticle,
    sanitizeArticle
  };