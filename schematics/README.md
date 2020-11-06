# Ng-Matero

[![npm](https://img.shields.io/npm/v/ng-matero.svg)](https://www.npmjs.com/package/ng-matero)
[![GitHub Release Date](https://img.shields.io/github/release-date/ng-matero/ng-matero)](https://github.com/ng-matero/ng-matero/releases)
[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/ng-matero/ng-matero/blob/master/LICENSE)
[![Gitter](https://img.shields.io/gitter/room/ng-matero/ng-matero.svg)](https://gitter.im/matero-io/ng-matero)
[![docs](https://img.shields.io/badge/docs-gitbook-red)](https://nzbin.gitbook.io/ng-matero/)
[![Material Extensions](https://img.shields.io/badge/material-extensions-blue)](https://github.com/ng-matero/extensions#readme)
[![Financial Contributors on Open Collective](https://opencollective.com/ng-matero/all/badge.svg?label=financial+contributors)](https://opencollective.com/ng-matero)

Ng-Matero is an Angular admin templete made with Material components.

## Installation

You can use the Anglar CLI Schematics to install the project.

```bash
$ ng new <project-name>
$ cd <project-name>
$ ng add ng-matero
```

## Schematics

You can use the ng-matero schematics to generate a module or a page.

### Module schematic

Generate a lazy loaded module.

```bash
$ ng g ng-matero:module <module-name>
```

The new module will be created in `routes` folder, it will be added in `routes.module` and its route declaration will be added in `routes-routing.module` automaticly.

### Page schematic

Generate a page component in the module.

```bash
$ ng g ng-matero:page <page-name> -m=<module-name>
```

Generate a entry component in the page component.

```bash
$ ng g ng-matero:page <page-name>/<entry-component-name> -m=<module-name> -e=true
```

### Example

Just two steps after initializing the project, you can get a route page.

```bash
$ ng g ng-matero:module abc
$ ng g ng-matero:page def -m=abc
```

Take a look at `http://localhost:4200/#/abc/def`, enjoy it!

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/ng-matero/ng-matero/graphs/contributors"><img src="https://opencollective.com/ng-matero/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/ng-matero/contribute)]

#### Individuals

<a href="https://opencollective.com/ng-matero"><img src="https://opencollective.com/ng-matero/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/ng-matero/contribute)]

<a href="https://opencollective.com/ng-matero/organization/0/website"><img src="https://opencollective.com/ng-matero/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/ng-matero/organization/1/website"><img src="https://opencollective.com/ng-matero/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/ng-matero/organization/2/website"><img src="https://opencollective.com/ng-matero/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/ng-matero/organization/3/website"><img src="https://opencollective.com/ng-matero/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/ng-matero/organization/4/website"><img src="https://opencollective.com/ng-matero/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/ng-matero/organization/5/website"><img src="https://opencollective.com/ng-matero/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/ng-matero/organization/6/website"><img src="https://opencollective.com/ng-matero/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/ng-matero/organization/7/website"><img src="https://opencollective.com/ng-matero/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/ng-matero/organization/8/website"><img src="https://opencollective.com/ng-matero/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/ng-matero/organization/9/website"><img src="https://opencollective.com/ng-matero/organization/9/avatar.svg"></a>

## License

MIT
