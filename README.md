## CKEditor 4 Dynamic Widget for Drupal 8

This boilerplate code solves a common issue where a CKEditor widget is not able
to instantiate an unknow number of items.

### How to use

This is a boilerplate code that will only handle the widget dynamic generation
of content and uses placeholder names and templates, so you are expected to take care of the following:

- Implement your template on `plugin.js` instead of the existing placeholder.
- Add any needed option on `dialogs/dynamic-widget.js` and implement it.
- Modify the editable instantiation on `init()` and `data()` methods on `plugin.js`
to reflect your HTML structure.
- Change the name of the CKEditor buttons, widgets and dialogs to reflect your name.
- Implement the CSS of your component.

### The problem to solve

Think of a list or a grid component: you want the user to be
able to instantiate N items, but you only need to define the item once. This is
a rather common scenario.

The problem is that CKEditor widget system assumes that your widget template
is going to be a singleton, this is, the `editable` areas are only instantiated
once and for the first item.

This means that, if you declare `.my-title` as an editable area and feed the
following structure, CKEditor will only consider the first element's title as
editable:

```html
<div class="my-template">
  <h4 class="my-title">Insert title here // ONLY THIS IS EDITABLE</h4>
  <p class="my-content">Insert content here</p>
</div>
<div class="my-template">
  <h4 class="my-title">Insert title here</h4>
  <p class="my-content">Insert content here</p>
</div>
<div class="my-template">
  <h4 class="my-title">Insert title here</h4>
  <p class="my-content">Insert content here</p>
</div>
```

### The solution on this approach

Many users have reflected on this issue, as you can see [here](https://github.com/ckeditor/ckeditor4/issues/3767) or
[here](https://stackoverflow.com/questions/36365916/ckeditor-multiple-editables-with-same-selector) or [here](https://dev.ckeditor.com/ticket/12524).

Given that CKEditor 4 won't solve this, the only solution is to name each item with a unique name
and generate editable areas for each one.

The different approach of this solution is to use CKEditor's widget `initEditable()` method in
order to be able to dynamically generate as many editable areas as needed.
