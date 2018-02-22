cd website
npm install

npm run ng build

cd ..

git clone git@github.com:testing-angular-applications/testing-angular-applications.github.io

cp -r website/dist/* testing-angular-applications.github.io/
cd testing-angular-applications.github.io/

git add -A
git commit -m "commit to deploy website"
git push origin master

cd ..
rm -rf testing-angular-applications.github.io/
