<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;700;900&display=swap" rel="stylesheet">

	<link rel="stylesheet" href="<?php echo get_template_directory_uri() ?>/css/slick.min.css">
	<link rel="stylesheet" href="<?php echo get_template_directory_uri() ?>/css/slick-theme.min.css">
	<link rel="stylesheet" href="<?php echo get_template_directory_uri() ?>/css/main.css">

	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<div class="wrapper" id="top">
		<header class="header">
			<div class="container">
				<div class="header-inner">
					<div class="header-block">
						<?php
							$logo_link = "#top";

							if (!is_front_page()) {
								$logo_link = get_home_url();
							}
						?>
						<a href="<?php echo $logo_link ?>" class="logo-block">
							<img src="<?php echo get_field('logo', 'options')['url']; ?>" alt="<?php echo get_field('logo', 'options')['alt']; ?>">
						</a>
					</div>
					<div class="header-block header-nav">
						<nav class="top-nav">
							<?php
								$args = array(
									'theme_location'  => '',
									'menu'            => 'Header menu',
									'container'       => '',
									'container_class' => '',
									'container_id'    => '',
									'menu_class'      => 'menu',
									'menu_id'         => '',
									'echo'            => true,
									'fallback_cb'     => 'wp_page_menu',
									'before'          => '',
									'after'           => '',
									'link_before'     => '',
									'link_after'      => '',
									'items_wrap'      => '<ul class="">%3$s</ul>',
									'depth'           => 0
								);
							
								wp_nav_menu($args);
							?>
						</nav>
					</div>
					<div class="header-block header-phone">
						<a href="tel:<?php echo get_field('phone', 'options'); ?>" class="phone-link"><?php echo get_field('phone', 'options'); ?></a>
					</div>
				</div>
			</div>
		</header>

		<header class="mobile-header">
			<div class="header-inner">
				<div class="header-block">
					<?php
						$logo_link = "#top";

						if (!is_front_page()) {
							$logo_link = get_home_url();
						}
					?>
					<a href="<?php echo $logo_link ?>" class="logo-block">
						<img src="<?php echo get_field('logo', 'options')['url']; ?>" alt="<?php echo get_field('logo', 'options')['alt']; ?>">
					</a>
				</div>

				<div class="header-block hide-on-thank-you">
					<a href="#contact-us" class="header-link chat">
						<svg class="link-icon">
							<use xlink:href="<?php echo get_template_directory_uri() ?>/img/icons-sprite.svg#chat"></use>
						</svg>
					</a>
				</div>

				<div class="header-block">
					<a href="tel:<?php echo get_field('phone', 'options'); ?>" class="header-link phone">
						<svg class="link-icon">
							<use xlink:href="<?php echo get_template_directory_uri() ?>/img/icons-sprite.svg#phone"></use>
						</svg>
					</a>
				</div>
			</div>
		</header>