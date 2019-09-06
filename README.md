<p align="center">
  <a href="https://github.com/ng-matero">
    <img width="150" src="https://avatars1.githubusercontent.com/u/49753463?s=200&v=4">
  </a>
</p>

<h1 align="center">
NG-MATERO
</h1>

<div align="center">

Ng-Matero is an Angular admin templete made with Material componnets.

[![npm](https://img.shields.io/npm/v/ng-matero.svg?style=flat-square)](https://www.npmjs.com/package/ng-matero)
[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/ng-matero/ng-matero)

</div>

## ✨ Features

- Schematics support
- Modern design style
- Various layout
- Powerful color system
- Rich helpers
- Common Page Templates


## 🔧 Installation

The project has support `ng add` yet. 

When you create a new angular project, you must choose the `scss` style format.

```bash
$ ng new <project-name>
$ cd <project-name>
$ ng add ng-matero
```

You can also git clone the starter repo to start. But it's not recommended.

```bash
$ git clone --depth git@github.com:ng-matero/starter.git
```

## ⚙️ Schematics

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

## 💻 Development

```bash
$ git clone git@github.com:ng-matero/ng-matero.git
$ cd ng-matero
$ npm install
$ npm run hmr
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## 🗺 Road Map

- [X] Schematics Support
- [ ] Material Extral Components
- [ ] VS Code Snippet

## 📃 License

MIT
