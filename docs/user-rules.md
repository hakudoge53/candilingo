# User Rules System Documentation

## System Overview

The User Rules System in Candilingo is a comprehensive role-based access control (RBAC) system that manages user permissions and access levels throughout the application. It provides a flexible and secure way to control access to features and resources based on user roles and permissions.

### Key Concepts

1. **Roles**: Predefined user types that determine a user's base permissions and access levels
2. **Permissions**: Granular access rights that define what actions a user can perform
3. **Role Hierarchy**: A structured system where some roles inherit permissions from others
4. **Custom Permissions**: Additional permissions that can be granted to users beyond their role
5. **Project Roles**: Special roles for project-specific access control

### Architecture

The system consists of several key components:

1. **Database Layer**:
   - `profiles` table: Stores user profiles with role information
   - `role_permissions` table: Maps roles to their default permissions
   - `user_permissions` table: Stores custom permissions granted to users
   - `role_assignments_history` table: Tracks role changes
   - `permission_grants_history` table: Tracks permission grants/revokes

2. **Backend Functions**:
   - `check_user_permission`: Verifies if a user has a specific permission
   - `assign_user_role`: Handles role assignments
   - `grant_user_permission`: Manages custom permission grants

3. **Frontend Components**:
   - `useUserRoles` hook: Provides role and permission management
   - `usePermissions` hook: Checks multiple permissions
   - `withPermission` HOC: Protects routes based on permissions

## Role and Permission Definitions

### User Roles

1. **Admin**
   - Full system access
   - Can manage all aspects of the system
   - Inherits all permissions

2. **Teacher**
   - Can create and manage lessons
   - Can assign and grade lessons
   - Can create and edit content
   - Can manage project members

3. **Content Creator**
   - Can create and edit content
   - Can create and edit terms
   - Can view analytics

4. **Student**
   - Can view content
   - Can view lessons
   - Can view terms
   - Can view projects

5. **Moderator**
   - Can review content
   - Can edit terms
   - Can view analytics
   - Can view user profiles

6. **Editor**
   - Can edit project content and settings
   - Limited system-wide access

7. **Manager**
   - Can manage project content and settings
   - Team management capabilities

### Permission Types

1. **User Management**
   - `manage_users`: Full user management access
   - `view_users`: View user profiles and information
   - `create_users`: Create new user accounts
   - `update_users`: Modify existing user accounts
   - `delete_users`: Remove user accounts

2. **Content Management**
   - `create_content`: Create new content
   - `edit_content`: Modify existing content
   - `delete_content`: Remove content
   - `publish_content`: Publish content
   - `review_content`: Review and approve content

3. **Lesson Management**
   - `create_lessons`: Create new lessons
   - `edit_lessons`: Modify existing lessons
   - `delete_lessons`: Remove lessons
   - `assign_lessons`: Assign lessons to students
   - `grade_lessons`: Grade student submissions

4. **Glossary Management**
   - `create_terms`: Create new glossary terms
   - `edit_terms`: Modify existing terms
   - `delete_terms`: Remove terms
   - `manage_glossaries`: Manage glossary collections

5. **Project Management**
   - `create_projects`: Create new projects
   - `edit_projects`: Modify existing projects
   - `delete_projects`: Remove projects
   - `manage_project_members`: Manage project team members

6. **Analytics**
   - `view_analytics`: View analytics dashboards
   - `export_data`: Export analytics data

7. **System Settings**
   - `manage_settings`: Modify system settings
   - `view_logs`: View system logs

## API Usage

### Checking Permissions

```typescript
// Using the useUserRoles hook
const { checkPermission } = useUserRoles();
const hasPermission = await checkPermission(userId, 'create_lessons');

// Using the usePermissions hook
const permissions = usePermissions(['create_lessons', 'edit_lessons']);
const canCreateLessons = permissions.create_lessons;
```

### Assigning Roles

```typescript
// Using the useUserRoles hook
const { assignRole } = useUserRoles();
await assignRole({
  userId: 'user-123',
  newRole: 'teacher',
  assignedBy: 'admin-456',
  reason: 'Promotion to teacher role'
});
```

### Granting Custom Permissions

```typescript
// Using the useUserRoles hook
const { grantPermission } = useUserRoles();
await grantPermission({
  userId: 'user-123',
  permission: 'export_data',
  grantedBy: 'admin-456',
  expiresAt: new Date('2024-12-31'),
  reason: 'Temporary data export access'
});
```

## Component and Function Documentation

### Hooks

#### useUserRoles

```typescript
interface UseUserRolesResult {
  userRole: UserRole;
  userPermissions: PermissionName[];
  isLoading: boolean;
  error: Error | null;
  updateUserRole: (userId: string, newRole: UserRole) => Promise<void>;
  deactivateUser: (userId: string) => Promise<void>;
  activateUser: (userId: string) => Promise<void>;
}
```

Provides role and permission management functionality.

#### usePermissions

```typescript
function usePermissions(requiredPermissions: PermissionType[]): Record<PermissionType, boolean>
```

Checks multiple permissions simultaneously and returns a map of permission status.

### Higher-Order Components

#### withPermission

```typescript
function withPermission(requiredPermission: PermissionType): <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => React.FC<P>
```

Protects routes based on user permissions.

### Utility Functions

#### hasPermission

```typescript
async function hasPermission(userId: string, permissionName: PermissionName): Promise<boolean>
```

Checks if a user has a specific permission.

#### getUserPermissions

```typescript
async function getUserPermissions(userId: string): Promise<PermissionName[]>
```

Retrieves all permissions for a user.

## Testing Guide

### Test Categories

1. **Role-Based Data Filtering**
   - Tests data visibility based on user roles
   - Verifies correct filtering of lessons, users, and content

2. **Permission-Based Access Control**
   - Tests UI element visibility based on permissions
   - Verifies action restrictions

3. **Real-Time Updates**
   - Tests handling of concurrent updates
   - Verifies UI consistency during rapid changes

4. **Race Conditions**
   - Tests handling of rapid role/permission changes
   - Verifies data consistency during concurrent operations

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test DataFiltering.test.tsx

# Run tests with coverage
npm test -- --coverage
```

### Adding New Tests

1. Create a new test file in the appropriate directory
2. Import necessary dependencies and mock data
3. Define test cases using the following structure:

```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup code
  });

  it('should handle specific scenario', async () => {
    // Test implementation
  });
});
```

## Code Examples

### Checking Permissions in Components

```typescript
function LessonEditor() {
  const { userRole, userPermissions } = useUserRoles();
  const permissions = usePermissions(['edit_lessons', 'delete_lessons']);

  return (
    <div>
      {permissions.edit_lessons && (
        <button>Edit Lesson</button>
      )}
      {permissions.delete_lessons && (
        <button>Delete Lesson</button>
      )}
    </div>
  );
}
```

### Protecting Routes

```typescript
const ProtectedLessonRoute = withPermission('view_lessons')(LessonView);
```

### Handling Role-Based UI

```typescript
function Dashboard() {
  const { userRole } = useUserRoles();

  return (
    <div>
      {userRole === 'admin' && <AdminPanel />}
      {userRole === 'teacher' && <TeacherPanel />}
      {userRole === 'student' && <StudentPanel />}
    </div>
  );
}
```

## Best Practices

1. **Permission Checking**
   - Always check permissions before performing actions
   - Use the appropriate hooks for permission checks
   - Consider using the `withPermission` HOC for route protection

2. **Role Management**
   - Use role assignments for broad access control
   - Use custom permissions for specific access needs
   - Document role changes in the history

3. **UI Implementation**
   - Use role-based conditional rendering
   - Implement proper loading states
   - Handle permission errors gracefully

4. **Testing**
   - Test all permission combinations
   - Verify real-time updates
   - Test race conditions
   - Mock external dependencies

## Security Considerations

1. **Permission Inheritance**
   - Admin role inherits all permissions
   - Other roles inherit permissions based on their level
   - Custom permissions can override role permissions

2. **Access Control**
   - Server-side validation of all permissions
   - Client-side UI updates based on permissions
   - Proper error handling for unauthorized access

3. **Audit Trail**
   - Track all role changes
   - Log permission grants and revokes
   - Maintain history of access modifications

## Advanced Security Considerations

### Permission Inheritance Risks

1. **Overly Broad Permissions**
   - ⚠️ **Risk**: Admin role inheriting all permissions can lead to accidental exposure of sensitive operations
   - **Best Practices**:
     ```typescript
     // ❌ Avoid: Granting all permissions
     await grantPermission({
       userId: 'user-123',
       permission: '*', // Dangerous!
       grantedBy: 'admin-456'
     });

     // ✅ Do: Grant specific permissions
     await grantPermission({
       userId: 'user-123',
       permission: 'view_lessons',
       grantedBy: 'admin-456'
     });
     ```

2. **Granular Permission Management**
   - Implement least privilege principle
   - Use role-based permissions for broad access
   - Use custom permissions for specific needs
   - Regular review of permission assignments

### API Endpoint Security

1. **Backend Authorization**
   ```typescript
   // ❌ Avoid: Relying only on frontend checks
   function updateLesson(lessonId: string, data: LessonUpdate) {
     // Frontend-only check is insufficient
     if (!userPermissions.includes('edit_lessons')) {
       throw new Error('Unauthorized');
     }
     // ... update lesson
   }

   // ✅ Do: Implement backend authorization
   async function updateLesson(lessonId: string, data: LessonUpdate) {
     const { data: hasPermission } = await supabase
       .rpc('check_user_permission', {
         user_id: currentUserId,
         required_permission: 'edit_lessons'
       });

     if (!hasPermission) {
       throw new Error('Unauthorized');
     }

     // Additional resource-specific checks
     const lesson = await getLesson(lessonId);
     if (lesson.createdBy !== currentUserId && !isAdmin) {
       throw new Error('Unauthorized');
     }

     // ... update lesson
   }
   ```

2. **Middleware Implementation**
   ```typescript
   // Authorization middleware
   const requirePermission = (permission: PermissionType) => {
     return async (req: Request, res: Response, next: NextFunction) => {
       const userId = req.user.id;
       const hasPermission = await checkUserPermission(userId, permission);
       
       if (!hasPermission) {
         return res.status(403).json({ error: 'Unauthorized' });
       }
       
       next();
     };
   };

   // Usage in routes
   router.put('/lessons/:id', 
     requirePermission('edit_lessons'),
     async (req, res) => {
       // ... handle lesson update
     }
   );
   ```

### Data Validation and Sanitization

1. **Input Validation**
   ```typescript
   // ❌ Avoid: Direct use of user input
   const query = `SELECT * FROM lessons WHERE id = '${lessonId}'`;

   // ✅ Do: Use parameterized queries
   const { data } = await supabase
     .from('lessons')
     .select('*')
     .eq('id', lessonId)
     .single();
   ```

2. **Output Sanitization**
   ```typescript
   // ❌ Avoid: Direct output of user data
   <div>{userInput}</div>

   // ✅ Do: Sanitize output
   import DOMPurify from 'dompurify';
   
   const sanitizedInput = DOMPurify.sanitize(userInput);
   <div>{sanitizedInput}</div>
   ```

### Audit Trail Implementation

1. **Comprehensive Logging**
   ```typescript
   interface AuditLog {
     id: string;
     timestamp: Date;
     userId: string;
     action: string;
     resourceType: string;
     resourceId: string;
     changes: Record<string, any>;
     ipAddress: string;
     userAgent: string;
   }

   async function logAuditEvent(log: AuditLog) {
     await supabase
       .from('audit_logs')
       .insert({
         ...log,
         timestamp: new Date().toISOString()
       });
   }
   ```

2. **Secure Log Storage**
   - Encrypt sensitive data in logs
   - Implement log rotation
   - Use separate logging database
   - Regular log analysis

### Rate Limiting and Abuse Prevention

1. **API Rate Limiting**
   ```typescript
   // Rate limiting middleware
   const rateLimit = require('express-rate-limit');

   const roleAssignmentLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
     message: 'Too many role assignments, please try again later'
   });

   router.post('/roles/assign', 
     roleAssignmentLimiter,
     requirePermission('manage_users'),
     async (req, res) => {
       // ... handle role assignment
     }
   );
   ```

2. **Additional Protection Measures**
   - Implement request signing
   - Use CAPTCHA for sensitive operations
   - Monitor for suspicious patterns
   - Implement IP-based blocking

### Regular Security Audits

1. **Audit Checklist**
   - Review permission assignments
   - Check for unused permissions
   - Verify role hierarchy
   - Review custom permissions
   - Check audit logs for anomalies
   - Test authorization bypass attempts

2. **Automated Security Testing**
   ```typescript
   // Example security test
   describe('Authorization Security', () => {
     it('should prevent unauthorized access to admin endpoints', async () => {
       const response = await request(app)
         .post('/api/admin/users')
         .set('Authorization', `Bearer ${userToken}`)
         .send({ role: 'admin' });

       expect(response.status).toBe(403);
     });

     it('should prevent permission escalation', async () => {
       const response = await request(app)
         .post('/api/users/permissions')
         .set('Authorization', `Bearer ${userToken}`)
         .send({ permission: 'manage_users' });

       expect(response.status).toBe(403);
     });
   });
   ```

3. **Security Monitoring**
   - Set up alerts for suspicious activities
   - Monitor failed authorization attempts
   - Track permission changes
   - Review access patterns

### Security Best Practices Summary

1. **Always Validate on Backend**
   - Never trust frontend-only checks
   - Implement proper authorization middleware
   - Use parameterized queries
   - Sanitize user input

2. **Implement Proper Logging**
   - Log all security-relevant events
   - Include context in logs
   - Secure log storage
   - Regular log review

3. **Prevent Abuse**
   - Implement rate limiting
   - Monitor for suspicious patterns
   - Use CAPTCHA when appropriate
   - Regular security audits

4. **Maintain Security**
   - Regular permission reviews
   - Automated security testing
   - Security monitoring
   - Incident response plan 