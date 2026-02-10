import { type Request, type Response, type NextFunction } from 'express';

export class SecurityMiddleware {
  public static scrubPII(req: Request, res: Response, next: NextFunction) {
    const sensitiveFields = ['fullName', 'email', 'phone', 'address'];

    // Create a proxy for console.log to scrub PII from outgoing logs
    // (Simplified implementation for demonstration)
    const originalLog = console.log;
    console.log = (...args: any[]) => {
      const scrubbedArgs = args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
          const scrubbed = { ...arg };
          sensitiveFields.forEach(field => {
            if (field in scrubbed) scrubbed[field] = '[SCRUBBED]';
          });
          return scrubbed;
        }
        return arg;
      });
      originalLog.apply(console, scrubbedArgs);
    };

    next();
  }

  public static authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
    // Real implementation would verify JWT/OAuth token
    next();
  }
}
