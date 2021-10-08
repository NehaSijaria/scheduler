# Interview Scheduler
Single page application enables user to book/edit/cancel interview built using React.
Data is persisted by the API server using a PostgreSQL database.

## Features
# Interviews can be booked between Weekdays in an empty slot.
# A user can cancel/edit details an existing interview.
# The expected day updates the number of spots available when an interview is booked or canceled.
# A user is presented with a confirmation when they attempt to cancel an interview.
# A user is shown a status indicator while asynchronous operations are in progress.

## Final Product

!["Book an interview"](https://github.com/NehaSijaria/scheduler/blob/master/docs/Book%20Interview.png)
!["Available slot"](https://github.com/NehaSijaria/scheduler/blob/master/docs/Booked%20Slot.png)
!["Confirm before delete the interview"](https://github.com/NehaSijaria/scheduler/blob/master/docs/Confirm%20Delete.png)
!["Delete Interview"](https://github.com/NehaSijaria/scheduler/blob/master/docs/Delete%20Interview.png)

## Setup

Install dependencies with `npm install`.
# Dependencies

- axios
- @testing-library/react-hooks
- react-test-renderer
- psql
- React

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Cypress for ETE testing
