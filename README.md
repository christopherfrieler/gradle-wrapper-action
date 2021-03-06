# gradle-wrapper-action

A [GitHub Action](https://docs.github.com/en/actions) to execute [Gradle](https://gradle.org/) tasks with the [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html).

## Usage

### Inputs

#### `arguments`

**Required** Arguments for the gradle execution, usually tasks and further settings. Default `"tasks"`.

### Example

```yaml
- uses: actions/setup-java@v1  # setup java for gradle execution
- name: gradle execution  
  uses: christopherfrieler/gradle-wrapper-action@master
  with:
    arguments: 'build --info'
```

## Contributing and Developing
If you have an idea, problem or question about the gradle-wrapper-action you can open an [issue](https://github.com/christopherfrieler/gradle-wrapper-action/issues).

If you want to clone the repository and work on the code have a look at the [DEVELOPING.md](https://github.com/christopherfrieler/gradle-wrapper-action/blob/master/DEVELOPING.md).
