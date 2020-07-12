---
title: How to Write Tests for React in 2020 - Part 2
date: '2020-06-20'
template: 'post'
draft: false
slug: 'how-to-write-tests-for-react-part-2'
category: 'Testing'
tags:
  - 'React'
  - 'Testing'
  - 'Web Development'
description: 'Writing React Test with React recommend libraries - Jest & Testing Library for React Intermediate users.'
socialImage: '/media/posts/how-to-write-tests-for-react-part-2_cover.jpg'
---

![Cover Image](/media/posts/how-to-write-tests-for-react-part-2_cover.jpg)

> Writing React Test with React recommend libraries - Jest & Testing Library for React Intermediate users.

## **Please Note**

_In this article, I will explore more advanced concepts in React Testing, I hope you find them helpful for your situations. If you are a beginner in React or new to testing, I would suggest you check out [Part 1 Here](https://dev.to/kelvin9877/how-to-write-tests-for-react-in-2020-4oai) to have some fundamental knowledge before continue, thanks!_

## First, let's look at the **Accessibility Test**.

Front-end development is all about visualization and interacting with end-users, Accessibility Test can ensure our apps can reach as many as possible users out there.

![From React](https://dev-to-uploads.s3.amazonaws.com/i/vqpa9hzyd1kqqh493wzk.png)
**_From - https://reactjs.org/docs/accessibility.html_**

Writing **Accessibility Test** for every aspect of your app seems very intimidated, but thanks for [Deque Systems](https://www.deque.com/company/) - A company dedicated on improving software accessibility by offering [Axe](https://blog.kelvinliang.cn/www.deque.com/axe/) testing package freely available online, we can now easily leverage the expertise from many senior developers around the world by importing [Jest-axe](https://www.npmjs.com/package/jest-axe) along with Jest Library to test a web app's accessibility.

```javascript
npm install --save-dev jest-axe
```

or

```javascript
yarn add --dev jest-axe
```

With the package install, we can add the **Accessibility Test** into a project like this:

```javascript
// App.test.js
import React from 'react';
import App from './App';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

describe('App', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

It will help to ensure your FrontEnd Development complies with the latest version of [WCAG(Web Content Accessibility Guidelines)](https://www.w3.org/WAI/standards-guidelines/wcag/). For example, if you assign a wrong role to your Navigation bar component,

```javascript
// ./components/navBar.js
...
<div className="navbar" role='nav'>
   ...
</div>
...
```

It will alert you like below:

![A11y test wrong role](https://dev-to-uploads.s3.amazonaws.com/i/1qady8vhidfoduh4d8nz.png)

> Check out a List of WAI-ARIA Roles [Here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles).

Replace nav with navigation role as below, the test will pass.

```javascript
// ./components/navBar.js
...
<div className="navbar" role='navigation'>
   ...
</div>
...
```

As we can see above, this test will help ensure you follow the [WCAG(Web Content Accessibility Guidelines)](https://www.w3.org/WAI/standards-guidelines/wcag/) standard so your app can reach most of the people out there.

## Second, adding a **Snapshot Test**.

> Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly. -- From [Jest](http://jestjs.io/)

**You can put the test on the entire app or one specific component**. They can serve different purposes during the development cycle, you can either use Snapshot Test to ensure your app's UI doesn't change over time or compare the differences between the last snapshot with current output to iterate through your development.

Let's take the example of writing a test for the entire App to show you how to write a **snapshot test**.

```js
// App.test.js
import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';
...

describe('App', () => {
  ...

  test('snapShot testing', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
```

If this is the first time this test run, Jest will create a snapshot file(a folder "`__snapshots__`" will create as well) looks similar to this.

![snapshot-file-tree](https://dev-to-uploads.s3.amazonaws.com/i/7wcsxgtpd0of4zdk91rw.png)

```js
// App.test.js.snap
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`App snapShot testing 1`] = `
<div
  className="App"
>
  <div
    className="navbar"
  >
    ....
```

With this test in place, once you make any change over the DOM, the test will fail and show you exactly what is changed in a prettified format, like the output below:

![snapshot-test-error](https://dev-to-uploads.s3.amazonaws.com/i/etzzsl0hfx3baavp8kvd.png)

In this case, you can either press `u` to update the snapshot or change your code to make the test pass again.

> If you adding a snapshot test at the early stage of development, you might want to turn off the test for a while by adding `x` in front of the test, to avoid getting too many errors and slowing down the process.

```js
 xtest('should have no accessibility violations', async () => {
   ...
  });
```

## Third, let's see how to test a UI with an API call.

It is fairly common now a frontend UI has to fetch some data from an API before it renders its page. Writing tests about it becomes more essential for the Front End development today.

First, let's look at the process and think about how we can test it.

![web-api-datafetch](https://dev-to-uploads.s3.amazonaws.com/i/eh5nxp4ev3m0wfopnd4t.png)

1. When a condition is met (such as click on a button or page loaded), an API call will be triggered;
2. When data come back from API, usually response need to parse before going to next step (optional);
3. When having proper data, the browser starts to render the data accordingly;
4. On the other hand, if something goes wrong, an error message should show up in the browser.

In FrontEnd development, we can test things like below:

- whether the response comes back being correctly parsed?
- whether the data is correctly rendered in the browser in the right place?
- whether the browser show error message when something goes wrong?

However, we should not:

- Test the API call
- Call the real API for testing

> Because most of the time, API is hosted by the third party, the time to fetch data is uncontrollable. Besides, for some APIs, given the same parameters, the data come back may vary, which will make the test result unpredictable.

For testing with an API, we should:

![web-api-datafetch-Test](https://dev-to-uploads.s3.amazonaws.com/i/iomgaf7qmiuwguu2ze0n.png)

- Use Mock API for testing and return fack data
- Use fake data to compare UI elements to see if they match

**_If you got the ideas, let's dive into the real code practice._**

Let's say we want to test the following **News page** component, where it gets the news from `getNews` API call and render them on the browser.

```js
// ./page/News.js
import React, { useState, useEffect } from 'react';
import getNews from '../helpers/getNews';
import NewsTable from '../components/newsTable';

export default () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const subreddit = 'reactjs';

  useEffect(() => {
    getNews(subreddit)
      .then(res => {
        if (res.length > 0) {
          setPosts(res);
        } else {
          throw new Error('No such subreddit!');
        }
      })
      .catch(e => {
        setErrorMsg(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>What is News Lately?</h1>
      <div>
        {loading && 'Loading news ...'}
        {errorMsg && <p>{errorMsg}</p>}
        {!errorMsg && !loading && (
          <NewsTable news={posts} subreddit={subreddit} />
        )}
      </div>
    </>
  );
};
```

First, let's create a `__mocks__` folder at where the API call file located. (In our case, the API call file call **`getNews.js`**), create the mock API call file with the same name in this folder. Finally, prepare some mock data inside this folder.

![mock API folder](https://dev-to-uploads.s3.amazonaws.com/i/qle8njo9k4h7erxo0f0l.png)

**Mock API** file (`getNews.js`) should look sth like below -

```js
// ./helpers/__mocks__/getNews.js
import mockPosts from './mockPosts_music.json';

// Check if you are using the mock API file, can remove it later
console.log('use mock api');

export default () => Promise.resolve(mockPosts);
```

Vs. Real API Call

```js
// ./helpers/getNews.js
import axios from 'axios';
import dayjs from 'dayjs';

// API Reference - https://reddit-api.readthedocs.io/en/latest/#searching-submissions

const BASE_URL = 'https://api.pushshift.io/reddit/submission/search/';

export default async subreddit => {
  const threeMonthAgo = dayjs()
    .subtract(3, 'months')
    .unix();
  const numberOfPosts = 5;

  const url = `${BASE_URL}?subreddit=${subreddit}&after=${threeMonthAgo}&size=${numberOfPosts}&sort=desc&sort_type=score`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data.data.reduce((result, post) => {
        result.push({
          id: post.id,
          title: post.title,
          full_link: post.full_link,
          created_utc: post.created_utc,
          score: post.score,
          num_comments: post.num_comments,
          author: post.author
        });
        return result;
      }, []);
    }
  } catch (error) {
    throw new Error(error.message);
  }
  return null;
};
```

As we can see from the above codes, a `mock API call` just simply return a resolved mock data, while a `real API call` needs to go online and fetch data every time the test run.

With the mock API and mock data ready, we now start to write tests.

```js
// ./page/News.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import News from './News';

jest.mock('../helpers/getNews');  //adding this line before any test.

// I make this setup function to simplify repeated code later use in tests.
const setup = (component) => (
  render(
   // for react-router working properly in this component
  // if you don't use react-router in your project, you don't need it.
    <Router>
      {component}
    </Router>
  )
);

...
```

> **Please Note:**

```js
jest.mock('../helpers/getNews');
```

> Please add the above code at the beginning of every test file that would possibly trigger the API call, not just the API test file. I make this mistake at the beginning without any notifications, until I add console.log('call real API') to monitor calls during the test.

Next, we start to write a simple test to check whether a title and loading message are shown correctly.

```js
// ./page/News.test.js
...
describe('News Page', () => {
  test('load title and show status', async () => {
    setup(<News />);  //I use setup function to simplify the code.
    screen.getByText('What is News Lately?'); // check if the title show up
    await waitForElementToBeRemoved(() => screen.getByText('Loading news ...'));
  });
...
});
```

![mock_api_first_test_pass](https://dev-to-uploads.s3.amazonaws.com/i/9lznaamxzq3bleuccs3s.png)

With the mock API being called and page rendering as expected. We can now continue to write more complex tests.

```js
...
test('load news from api correctly', async () => {
    setup(<News />);
    screen.getByText('What is News Lately?');

    // wait for API get data back
    await waitForElementToBeRemoved(() => screen.getByText('Loading news ...'));

    screen.getByRole("table");  //check if a table show in UI now
    const rows = screen.getAllByRole("row");  // get all news from the table

    mockNews.forEach((post, index) => {
      const row = rows[index + 1];  // ignore the header row

       // use 'within' limit search range, it is possible have same author for different post
      within(row).getByText(post.title);  // compare row text with mock data
      within(row).getByText(post.author);
    })

    expect(getNews).toHaveBeenCalledTimes(1); // I expect the Mock API only been call once
    screen.debug(); // Optionally, you can use debug to print out the whole dom
  });
...
```

> **Please Note**

```js
expect(getNews).toHaveBeenCalledTimes(1);
```

> This code is essential here to ensure the API call is only called as expected.

When this API call test passes accordingly, we can start to explore something more exciting!

**_As we all know, an API call can go wrong sometimes due to various reasons, how are we gonna test it?_**

To do that, we need to re-write our mock API file first.

```js
// // ./helpers/__mocks__/getNews.js
console.log('use mock api'); // optionally put here to check if the app calling the Mock API
// check more about mock functions at https://jestjs.io/docs/en/mock-function-api
const getNews = jest.fn().mockResolvedValue([]);
export default getNews;
```

Then we need to re-write the setup function in `News.test.js` file.

```js
// ./page/News.test.js
...
// need to import mock data and getNews function
import mockNews from '../helpers/__mocks__/mockPosts_music.json';
import getNews from '../helpers/getNews';
...
// now we need to pass state and data to the initial setup
const setup = (component,  state = 'pass', data = mockNews) => {
  if (state === 'pass') {
    getNews.mockResolvedValueOnce(data);
  } else if (state === 'fail') {
    getNews.mockRejectedValue(new Error(data[0]));
  }

  return (
    render(
      <Router>
        {component}
      </Router>
    ))
};
...
```

I pass the default values into the setup function here, so you don't have to change previous tests. But I do suggest pass them in the test instead to make the tests more readable.

Now, let's write the test for API failing.

```js
// ./page/News.test.js
...
test('load news with network errors', async () => {
    // pass whatever error message you want here.
    setup(<News />, 'fail', ['network error']);
    screen.getByText('What is News Lately?');

    await waitForElementToBeRemoved(() => screen.getByText('Loading news ...'));
    screen.getByText('network error');

    expect(getNews).toHaveBeenCalledTimes(1);
  })
...
```

Finally, you can find the complete test code from [here](https://github.com/kelvin8773/react-test-examples/blob/master/src/pages/News.test.js).

> **Please Note**
> They are just simple test cases for demonstration purposes, in the real-world scenarios, the tests would be much more complex. You can check out more testing examples from my other project [here](https://github.com/ooloo-io/reddit-timer-kelvin8773).

---

![Final Lesson](https://dev-to-uploads.s3.amazonaws.com/i/rjst30dgl43v17rpewjq.jpg)
Photo by [ThisisEngineering RAEng](https://unsplash.com/@thisisengineering) on **Unsplash**

## **Final words**

In this article, I followed the best practices **Kent C. Dodds** suggested in his blog post - [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) published in May 2020, in which you might find my code is slightly different from **[Test-Library Example](https://testing-library.com/docs/react-testing-library/example-intro)** (I think soon Kent will update the docs as well), but I believe that should be how we write the test in 2020 and onward.

I use both **[styled-component](https://testing-library.com/docs/react-testing-library/example-intro)** and in-line style in this project to make UI look better, but it is not necessary, you are free to use whatever CSS framework in react, it should not affect the tests.

Finally, **_Testing_** is an advanced topic in FrontEnd development, I only touch very few aspects of it and I am still learning. If you like me, just starting out, I would suggest you use the examples here or some from [my previous article](https://dev.to/kelvin9877/how-to-write-tests-for-react-in-2020-4oai) to play around with your personal projects. Once you master the fundamentals, you can start to explore more alternatives on the market to find the best fit for your need.

### Here are some resources I recommend to continue learning:

- [Testing from Create React App](https://create-react-app.dev/docs/running-tests)
- [Which Query should I use From Testing Library](https://testing-library.com/docs/guide-which-query)
- [More examples from Testing Library](https://testing-library.com/docs/example-codesandbox)
- [Write Test for Redux from Redux.js](https://redux.js.org/recipes/writing-tests)
- [Unit Test From Gatsby.js](https://www.gatsbyjs.org/docs/unit-testing/)
- [Effective Snapshot Testing](https://kentcdodds.com/blog/effective-snapshot-testing) from [Kent C.Dodds](https://kentcdodds.com/).

### Resources and Article I referenced to finished this article:

- [Inside a dev’s mind — Refactoring and debugging a React test](https://dev.to/jkettmann/inside-a-dev-s-mind-refactoring-and-debugging-a-react-test-2jap) By [Johannes Kettmann](https://dev.to/jkettmann).
- [Don't useEffect as callback!](https://jkettmann.com/dont-useeffect-as-callback/) by [Johannes Kettmann](https://dev.to/jkettmann).
- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) by [Kent C.Dodds](https://kentcdodds.com/).
- [Fix the not wrapped act warning](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning) by [Kent C.Dodds](https://kentcdodds.com/).
- [Accessibility From React](https://reactjs.org/docs/accessibility.html).
- [Axe for Jest](https://www.npmjs.com/package/jest-axe).

### Special Thanks for [Johannes Kettmann](https://dev.to/jkettmann) and his course [ooloo.io](https://ooloo.io/) for given ideas and guidance to this series.

_This article original posted in [Dev.to](http://localhost:8000/posts/how-to-write-tests-for-react-part-2)_
