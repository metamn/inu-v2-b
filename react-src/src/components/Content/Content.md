The component performs the following tasks:

<details>
	<summary>###Defines the content display modes

`blank` - When the menu is visible
`slider` - When a category or Random slideshow is displayed
`thumbs` - When a category is displayd`
`page` - When the Contact page is displayed

</summary>
</details>

<details>
	<summary>###Defines the prop types

</summary>
* The active menu item

* The active display mode

* Sets the active display mode

* The active image

* The active image setter

* The featured images.

* The contact page content

* The default content switcher icon

</details>

<details>
	<summary>###Defines the default props

</summary>
</details>

<details>
	<summary>###Styles the icon

</summary>
</details>

<details>
	<summary>###Creates a context for the thumb click.

</summary>
</details>

<details>
	<summary>###Displays various content types

</summary>
* Decides if there is a slideshow

* Sets the status of the content switcher icon

Active - when a category is displayed
Hidden - When there is a Slideshow
Inactive - Otherwise ...

* Creates a `ref` to the slides.

It will be used to calculate the active image by the content switcher

* Removes the content switcher click handler when the content switcher icon is inactive

* Manages the click on the content switcher icon

* Manages the click on a thumb.

* Decides which content to be displayed.

</details>

