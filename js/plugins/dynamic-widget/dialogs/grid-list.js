/**
 * @file
 * Defines dialog for GridList CKEditor plugin.
 */

(function (Drupal, $) {

  'use strict';

  // Dialog definition.
  CKEDITOR.dialog.add('gridListDialog', function (editor) {

    return {

      // Basic properties of the dialog window: title, minimum size.
      title: Drupal.t('Grid list configuration'),
      minWidth: 400,
      minHeight: 150,

      // Dialog window content definition.
      contents: [
        {
          // Definition of the settings dialog tab.
          id: 'tab-settings',
          label: 'Settings',

          // The tab content.
          elements: [
            {
              type: 'html',
              html: '<p>You currently have <span>0</span> list items. Please input the desired number of elements.<br> Be careful: if your input is smaller than the current number of items, you will delete some elements.</p>',
              setup: function (widget) {
                var $html = $(this.getElement().$);
                $html.find('span').text(widget.data.elements);
              },
            },
            {
              // Text input field for the abbreviation text.
              type: 'text',
              id: 'elements',
              label: Drupal.t('Number of elements'),
              default: '2',
              maxLength: 2,
              setup: function (widget) {
                this.setValue(widget.data.elements);
              },
              commit: function (widget) {
                widget.setData('elements', this.getValue());
              },
              // Validation checking whether the field is not empty.
              validate: CKEDITOR.dialog.validate.integer(Drupal.t('You have to introduce a valid number of elements on the list.'))
            },
          ]
        }
      ],
    };

  });

} (Drupal, jQuery));
