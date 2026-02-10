# GStuart Projects

Checkout my website [here](https://GWStuart.github.io)

The website showcases some of my favourite programming projects over time.

The site was made using Jekyll and is powerd by GitHub Pages.

<br>

<br>

## Notes to Self
Here are just a few personal notes to myself since I don't maintain this website very actively and so I often forget how to work with it.

When running the website locally you need to ensure that jekyll is installed,
```
jekyll --version
```
If that command does not work then install it. Note that there are some dependencies such as ruby but you should be able to find this all online.

Then navigate to the directory of the cloned repository and load all of the dependencies specified in the `Gemfile` with the command,
```
bundle install
```
If you have dependencies errors then try running `bundle update` first.

Run the server locally with live reload using the following command,
```
bundle exec jekyll serve --livereload
```

## Other Notes to Self

### Deprecated @import rules
When running jekyll locally you will see many deprecation warnings because @import rules have been deprecated and should be replaced with @use. However GitHub pages does nott yet support @use so you will have to ignore these warnings. Once github pages does support it it will be an easy fix you just need to replace @import with the commented out @use statements that are in the `assets/css/main.scss` file and all files within the `_sass/` directory.
