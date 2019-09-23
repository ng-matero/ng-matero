# Ng-Matero

Ng-Matero is an Angular admin templete made with Material components. 

You can use the Anglar CLI Schematics to install the project.

## Installation

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

The new module will be created in `routes` file, it will be added in `routes.module` and its route declaration will be added in `routes-routing.module` automaticly.

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

## License

MIT

