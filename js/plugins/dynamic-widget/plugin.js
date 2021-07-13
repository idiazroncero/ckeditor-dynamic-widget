/**
 * @file
 * GridList CKEditor plugin.
 *
 * Plugin that inserts N elements on a ordered list HTML element.
 *
 */

(function (Drupal) {

  'use strict';

  CKEDITOR.plugins.add('ckeditor_dynamic_widget', {
    icons: 'dynamic-widget',
    requires: 'widget,dialog',

    // The plugin initialization logic goes inside this method.
    init: function (editor) {

      CKEDITOR.dialog.add('dynamic-widget-dialog', this.path + 'dialogs/dynamic-widget.js');

      editor.widgets.add('dynamic-widget', {
        dialog: 'dynamic-widget-dialog',
        template: '<div class="dynamic-content dynamic-content--0"><h4>Item title</h4><p>Item content</p></div>',
        editables: {
          title1 : {
            selector: '.dynamic-content--0 h4',
            allowedContent: 'em strong'
          },
          content1 : {
            selector: '.dynamic-content--0 p',
            allowedContent: 'span br em strong a'
          },
        },
        allowedContent: 'div(*);h4;p',
        requiredContent: 'div(dynamic-content)',
        init: function () {
          // Count the number of children on init.
          this.data.elements = this.element.find('li').count();

          // Init existing editables
          for (var i = 1; i < parseInt(this.data.elements); i++){
            var titleEditable = this.initEditable('title' + i, {
              selector: '.dynamic-content--' + i + ' h4',
              allowedContent: 'strong'
            });
            var contentEditable = this.initEditable('content-' + i, {
              selector: '.dynamic-content--' + i + ' p',
              allowedContent: 'span br em strong a'
            });
            if (!titleEditable && !contentEditable) {
              console.error('Grid item number ' + i + ' couldn\'t be initialized');
            };
          }
        },
        data: function () {
          var currentElements = this.element.find('li').count();

          if (this.data.elements) {
            var targetElements = parseInt(this.data.elements);
            // CASE 1: User is adding elements.
            if (currentElements < targetElements) {
              for (var i = currentElements; i < targetElements; i++){

                // Generate and append a new item.
                var newItem = new CKEDITOR.dom.element('li');
                newItem.setAttribute('class', 'dynamic-content dynamic-content--' + i);
                newItem.appendHtml('<h4>Here comes the title</h4><p>Here comes the content</p>');
                this.element.append(newItem);

                // Dynamically generate the editable areas.
                var titleEditable = this.initEditable('title' + i, {
                  selector: '.dynamic-content--' + i + ' h4',
                  allowedContent: 'em strong'
                });
                var contentEditable = this.initEditable('content-' + i, {
                  selector: '.dynamic-content--' + i + ' p',
                  allowedContent: 'span br em strong a'
                });
                if (!titleEditable && !contentEditable) {
                  console.error('Grid item number ' + i + ' couldn\'t be initialized');
                };
              }
            }
            // CASE 2: User is substracting elements
            else if (currentElements > targetElements){
              var children = this.element.find('li')
              children.toArray().forEach(function(item, index){
                if (index >= targetElements) {
                  item.remove();
                }
              });
            }
          };
        },
        upcast: function( element ) {
          return element.name == 'div' && element.hasClass('dynamic-content');
        },
      });

      editor.ui.addButton('dynamic-widget', {
        label: Drupal.t('Insert dynamic widget'),
        command: 'dynamic-widget',
        icon: this.path + 'icons/dynamic-widget.png'
      });

    }
  });

} (Drupal));
