<?php

namespace Drupal\cc_ckeditor\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "Dynamic Widget" plugin.
 *
 * @CKEditorPlugin(
 *   id = "dynamic_widget",
 *   label = @Translation("Dynamic Widget"),
 *   module = "ckeditor_dynamic_widget"
 * )
 */
class DynamicWidget extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return drupal_get_path('module', 'cc_ckeditor') . '/js/plugins/dynamic-widget/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    $module_path = drupal_get_path('module', 'ckeditor_dynamic_widget');
    return [
      'dynamic-widget' => [
        'label' => $this->t('Dynamic Widget'),
        'image' => $module_path . '/js/plugins/dynamic-widget/icons/dynamic-widget.png',
      ],
    ];
  }

}
