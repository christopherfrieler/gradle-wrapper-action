# gradle-wrapper-action

A [GitHub Action](https://docs.github.com/en/actions) to execute [Gradle](https://gradle.org/) tasks with the [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html).

The action also implements some work usually done together with a gradle execution in a GitHub Actions workflow:
- caching the gradle distribution and project dependencies
- uploading build-artifacts

## Usage

### Inputs

#### `arguments`

**Required** Arguments for the gradle execution, usually tasks and further settings. Default `"tasks"`.

#### `gradle_dist_cache_key`

**Required** Cache-key for the gradle-distribution, usually some sort of hash of the gradle-wrapper.properties file. Default `gradle-dists-${{ hashFiles('gradle/wrapper/gradle-wrapper.properties') }}`.

#### `gradle_deps_cache_key`

**Required** Cache-key for gradle dependencies, usually some sort of hash of the .gradle-files. Default `gradle-deps-${{ hashFiles('**/*.gradle*') }}`.

#### `artifacts`

Optional artifacts to upload after the gradle execution.
Artifacts are specified as a name and path separated by a space character, where the path can be a [glob pattern](https://github.com/actions/toolkit/tree/main/packages/glob#patterns).
You can specify multiple artifacts declaring one per line. 

### Example

```yaml
- uses: actions/setup-java@v1  # setup java for gradle execution
- name: gradle execution  
  uses: christopherfrieler/gradle-wrapper-action@0.1.1
  with:
    arguments: 'build --info'
    artifacts: |
      package build/libs/*.jar
```

## Contributing and Developing
If you have an idea, problem or question about the gradle-wrapper-action you can open an [issue](https://github.com/christopherfrieler/gradle-wrapper-action/issues).

If you want to clone the repository and work on the code have a look at the [DEVELOPING.md](https://github.com/christopherfrieler/gradle-wrapper-action/blob/master/DEVELOPING.md).
