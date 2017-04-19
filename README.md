# the latest
**file:** steph_trial_3_LATEST

**changed:** model/user.js, routes/index.js (specifically: the newUser info included and the passport.use local strategy from username lookup to email lookup)

**for:** in hopes of expanding the registration

**results:** 
-registration is making it into the database, although groupName, even though it's not required in the user.js model is needed bc if left blank more than once is being read as a duplicate.
-login auth isn't working. No error except the one shown on the login page






# the Wheels of Civic Action App
This project is being developed for DA 670S-Web Development Studio in the Digital Arts graduate program at Goucher College. The project draws inspiration from the use of technology for civic prosperity and will be developed using React.JS.

## the Project
Initially the concept was to create a mobile app that allowed users to search for events and other civic actions by location, date and issue.

:bomb: :boom: days later the [resistance calendar](https://www.resistancecalendar.org/) came out and I found [we protest today](https://www.weprotest.today/). They were already doing it. Better and with more people than I was.

Now on to a new, if not related idea (being brainstormed now), that supports all this work being done. Making civic involvement more familiar and allowing ownership of it by anyone who wants to act.

## the Tools
**Research**: Aggregation, APIs, SQL mirroring and even RSS feeds were investigated as possible means of transporting data from resources promoting (facebook) or hosting (moveon.org) actionable items related to civic engagement.

**Development**: *React.JS.* As a newcomer to React and not the most experienced Javascript writer, I'm learning the language and will be exploring as I go.
