/**
 * @file
 * GridList CKEditor plugin.
 *
 * Plugin that inserts N elements on a ordered list HTML element.
 *
 */

(function (Drupal, $) {

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
          var $element = $(this.element.$);
          this.data.elements = $element.find('li').length;

          // Init existing editables
          for (var i = 1; i < parseInt(this.data.elements); i++){
            var titleEditable = this.initEditable('title' + i, {
              selector: '.grid-list__item--' + i + ' .grid-list__title',
              allowedContent: 'strong'
            });
            var contentEditable = this.initEditable('content-' + i, {
              selector: '.grid-list__item--' + i + ' .grid-list__content',
              allowedContent: 'span br em strong a'
            });
            if (!titleEditable && !contentEditable) {
              console.error('Grid item number ' + i + ' couldn\'t be initialized');
            };
          }
        },
        data: function () {
          var $element = $(this.element.$);
          var currentElements = $element.find('li').length

          // Add more items if needed.
          if (this.data.elements) {
            var targetElements = parseInt(this.data.elements);
            // Addign elements
            if (currentElements < targetElements) {
              for (var i = currentElements; i < targetElements; i++){
                $element.append('<li class="grid-list__item grid-list__item--' + i + '"><p class="grid-list__title">Here comes the title</p><p class="grid-list__content">Here comes the content</p></li>');
                var titleEditable = this.initEditable('title' + i, {
                  selector: '.grid-list__item--' + i + ' .grid-list__title',
                  allowedContent: 'em strong'
                });
                var contentEditable = this.initEditable('content-' + i, {
                  selector: '.grid-list__item--' + i + ' .grid-list__content',
                  allowedContent: 'span br em strong a'
                });
                if (!titleEditable && !contentEditable) {
                  console.error('Grid item number ' + i + ' couldn\'t be initialized');
                };
              }
            }
            // Substracting elements
            else if (currentElements > targetElements){
              $element.find('li').each(function(index, item){
                if (index >= targetElements) {
                  $(this).remove();
                }
              });
            }
          };
        },
        upcast: function( element ) {
          return element.name == 'ol' && element.hasClass('grid-list');
        },
      });

      editor.ui.addButton('grid-list', {
        label: Drupal.t('Insert grid list'),
        command: 'gridList',
        icon: this.path + 'icons/grid-list.png'
      });

    }
  });

} (Drupal, jQuery));