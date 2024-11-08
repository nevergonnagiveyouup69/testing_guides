import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import { setVitestCucumberConfiguration } from '@amiceli/vitest-cucumber'

expect.extend(matchers);

setVitestCucumberConfiguration({
    language: 'fr', excludeTags: ['beta']
})
// or just excludeTags
setVitestCucumberConfiguration({
    excludeTags: ['beta']
})
// or just language
setVitestCucumberConfiguration({
    language: 'it'
})
setVitestCucumberConfiguration({ 
    onStepError ({ step}) {
        // error : first error caught by onTestFailed
        // ctx : TaskContext
        // step : current failed step
        console.error(step.details)
        screen.logTestingPlayground()
    }
})

afterEach(() => {
    cleanup();
});