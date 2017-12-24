# Normally, you'd keep tests in the same directory as the components
# and services that they cover. For the purposes of this book, we've
# kept the website/ directory clear of tests, so you can develop
# them as you go. 
# Copy the unit tests from Chapter 3 to their appropriate
# home, so that we can run these tests in CI.
cp ../chapter03/contacts.component.spec.ts ../website/src/app/contacts
cp ../chapter03/contacts-edit.component.spec.ts ../website/src/app/contacts/contact-edit

# Copy over the CI configuration
cp karma-ci.conf.js ../website

# Run the karma tests
cd ../website
npm install
./node_modules/.bin/karma start karma-ci.conf.js
