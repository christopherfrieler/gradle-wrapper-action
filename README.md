# gradle-wrapper-action

A [GitHub Action](https://docs.github.com/en/actions) to execute [Gradle](https://gradle.org/) tasks with the [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html).

The action also implements some work usually done together with a Gradle execution in a GitHub Actions workflow:
- caching the Gradle distribution and project dependencies
- uploading build-artifacts

## Usage

### Inputs

#### `gradle_project_root`

**Required** The root directory of the Gradle project.
Default `'.'`.

#### `arguments`

**Required** Arguments for the Gradle execution, usually tasks and further settings. Default `"tasks"`.

#### `gradle_dist_spec_files`

**Required** File paths that specify the Gradle distribution in use to cache it.
Supports [glob patterns](https://github.com/actions/toolkit/tree/main/packages/glob#patterns) and multiple files or patterns as a comma-separated list.
Default `'gradle/wrapper/gradle-wrapper.properties'`.

#### `gradle_deps_spec_files`

**Required** File paths that specify Gradle project dependencies to cache them.
Supports [glob patterns](https://github.com/actions/toolkit/tree/main/packages/glob#patterns) and multiple files or patterns as a comma-separated list.
Default `'**/*.gradle*,gradle/libs.versions.toml'`.

#### `artifacts`

Optional artifacts to upload after the Gradle execution.
Artifacts are specified as a name and one or more paths separated by space characters, where each path can be a [glob pattern](https://github.com/actions/toolkit/tree/main/packages/glob#patterns).
You can specify multiple artifacts declaring one per line. 

### Example

```yaml
- uses: actions/setup-java@v5  # setup java for Gradle execution
- name: gradle execution  
  uses: christopherfrieler/gradle-wrapper-action@v0.6.0
  with:
    arguments: 'build --info'
    artifacts: |
      package build/libs/*.jar
```

## Contributing and Developing
If you have an idea, problem or question about the gradle-wrapper-action, you can open an [issue](https://github.com/christopherfrieler/gradle-wrapper-action/issues).

If you want to clone the repository and work on the code, have a look at the [DEVELOPING.md](./DEVELOPING.md).
