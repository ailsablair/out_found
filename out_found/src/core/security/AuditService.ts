export enum AuditAction {
  ACCESS = 'access',
  MODIFY = 'modify',
  DELETE = 'delete',
  EXPORT = 'export'
}

export interface AuditLog {
  timestamp: Date;
  userId: string;
  action: AuditAction;
  resourceId: string;
  resourceType: string;
  details: string;
}

export class AuditService {
  public static log(entry: AuditLog) {
    // In a real app, this would write to a secure, append-only database
    console.log(`[AUDIT] ${entry.timestamp.toISOString()} | User: ${entry.userId} | Action: ${entry.action} | Resource: ${entry.resourceType}(${entry.resourceId}) | Details: ${entry.details}`);
  }
}
