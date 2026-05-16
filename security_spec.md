# StudyForge Security Specification

## Data Invariants
1. A user can only read and write their own profile document in `/users/{userId}`.
2. A user can only read and write their own settings in `/users/{userId}/settings/config`.
3. System collections used for testing or public info (if any) are read-only for users.

## The "Dirty Dozen" Payloads
1. **Identity Theft**: Attempting to write a user profile with a `userId` that doesn't match the authenticated UID.
2. **Ghost Fields**: Adding unapproved fields like `isAdmin: true` to a user profile.
3. **Invalid ID**: Using a 2KB string as a `userId`.
4. **Type Poisoning**: Sending an integer for the `email` field.
5. **Unauthorized Read**: Attempting to read `/users/alien-uid`.
6. **Self-Promotion**: Updating own document to add an `admin` role (if implemented).
7. **Size Attack**: Sending a 1MB string for the `name` field.
8. **Relational Breach**: Trying to access a subcollection of another user.
9. **Creation Shadowing**: Creating a user document without required fields like `email`.
10. **Immutable Field Change**: Trying to update `userId` after creation.
11. **Timestamp Spoofing**: Sending a manual client timestamp instead of `request.time`.
12. **Blanket Query**: Querying all users without a filter on `userId`.

## Test Runner Logic
All payloads above MUST return `PERMISSION_DENIED`.
