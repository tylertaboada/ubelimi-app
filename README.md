# Models

-- User
-- Moment
-- Local (v2)

## User Model

## Moment Model

# Views

**Home** - ' / '
**About** - ' /about '
**Sign In** - ' /authentication/sign-in '
**Sign Up** - ' /sign-up '
**User Profile** - ' /profile/:id '
**All Moments** - ' /moment '
**Create Moment** - ' /moment/create '
**Single Moment** - ' /moment/:id '
**Edit Moment** - ' /moment/:id/edit '
**Grateful** - ' /moment/:id/grateful
**Learned** - ' /moment/:id/learned
**Error** - '/error'

# Route Handlers

```
METHOD            ENDPOINT/ACTION               DESCRIPTION
GET               ' / '                         Displays home view
GET               ' /about '                    Displays about view

GET               ' /authentication/sign-up '   Displays home view
POST              ' /authentication/sign-up '   Displays home view

GET               ' /authentication/sign-in '   Displays home view
POST              ' /authentication/sign-in '   Displays home view
POST              ' /authentication/sign-out '  Displays home view

GET               ' /moment/create '            Moment creation view
POST              ' /moment/create '            Handle moment creation form submission. Redirect user to Moment home view

GET               ' /moment/:id '               Displays single Moment view
GET               ' /moment/:id/edit '          Display moment edit view
POST              ' /moment/:id/edit '          Handle Moment edit form submission. Redirect user to Moment home view
POST              ' /moment/:id/delete'         Delete single post

GET               ' /profile/:id'               Display a specific user's profile view
GET               ' /profile/edit'              Display edit form for profile
POST              ' /profile/edit'              Handle edit profile form submissions
```
