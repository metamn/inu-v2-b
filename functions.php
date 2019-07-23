<?php
// Thumbnail support
// - the old way was getting the image associated to the post
add_theme_support( 'post-thumbnails' );

// Get current theme
// From https://spectrum.chat/wpgraphql/general/current-theme-id~dd67a5d3-0c97-4b55-93ba-8d3fcee77576
add_action( 'graphql_register_types', function() {
    register_graphql_field( 'RootQuery', 'activeTheme', [
        'type' => 'Theme',
        'description' => __( 'The currently active theme for the site', 'your-textdomain' ),
        'resolve' => function() {
            $theme = wp_get_theme();
            return new Theme( $theme );
        }
    ] );
} );

// Automatically calling the first image attached to a post as the featured image
// From: https://plasterdog.com/automatically-calling-the-first-image-attached-to-a-post-as-the-featured-image/
function autoset_featured() {
    global $post;
    $already_has_thumb = has_post_thumbnail($post->ID);
        if (!$already_has_thumb)  {
        $attached_image = get_children( "post_parent=$post->ID&post_type=attachment&post_mime_type=image&numberposts=1" );
            if ($attached_image) {
                foreach ($attached_image as $attachment_id => $attachment) {
                    set_post_thumbnail($post->ID, $attachment_id);
                }
            }
        }
}
add_action('the_post', 'autoset_featured');
add_action('save_post', 'autoset_featured');
add_action('draft_to_publish', 'autoset_featured');
add_action('new_to_publish', 'autoset_featured');
add_action('pending_to_publish', 'autoset_featured');
add_action('future_to_publish', 'autoset_featured');
?>
