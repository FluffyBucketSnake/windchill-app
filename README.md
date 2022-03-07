# Wind Chill App

A small simple project to practice mobile development and UI design. In particular, it's about solidifying my Typescript and React Native skills.

This app is based on an [app idea of similar name.](https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Windchill-App.md)

## User stories

### Main

- [x] User can select the measurement system calculations will be performed in - Metric or English

- [x] User can enter the actual temperature and the wind speed

- [x] User can press the `Calculate` button to display the wind chill

- [x] User will receive an error message when `Calculate` is clicked if data values are not entered

### Bonus

- [x] User will receive an error message when `Calculate` is clicked if the resulting wind chill factor is greater than or equal to the actual temperature. Since this signifies an internal error in the calculation you may also satisfy this requirement using an assertion ~~It's impossible to happen due to the equation.~~ Ignore that, it depends on the value of the wind speed.

- [x] User will be prompted to enter new data values if `Calculate` is pressed without first changing at least one of the input fields

- [x] User will see an updated wind chill factor whenever new actual temperature or wind speed values are entered, without being required to click the `Calculate` button

## Tools

- Typescript;
- React Native;
- Expo.

## Media content

- Icons: [FluentUI](https://github.com/microsoft/fluentui-system-icons) by Microsoft

- Background: [Pink and Blue Sky](https://www.pexels.com/photo/pink-and-blue-sky-1235398/) by Oleg Magni