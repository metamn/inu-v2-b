The component performs the following tasks:

<details>
	<summary>###Defines the prop types

</summary>
* A set of image sources

* A set of source sizes

* The widths used in the srcSet.
They will be passed to media queries to avoid image flicks on loading.

* To use ProgressiveImage?

* Is it still loading?

* Delay the loading of the image in miliseconds

</details>

<details>
	<summary>###Defines the default props

</summary>
</details>

<details>
	<summary>###Styles the component container

</summary>
</details>

<details>
	<summary>###Creates `max-widths` for various CSS breakpoints to prevent image flicking on load.

When `srcset`, `sizes` is used the image has to be made responsive also in CSS. Otherwise after the responsive image is loaded it will flick because the preloader image in `src` has a single size instead of the same responsive sizes.

Example:
```
<img src="http://metamn.io/assets/images/beat-home-mobile_desktop.png" srcset="http://metamn.io/assets/images/beat-home-mobile_mobile.png 306w, http://metamn.io/assets/images/beat-home-mobile_tablet.png 535w, http://metamn.io/assets/images/beat-home-mobile_laptop.png 622w, http://metamn.io/assets/images/beat-home-mobile_desktop.png 898w" sizes="(max-width: 767px) 306px, (max-width: 1024px) 535px, (max-width:1600px) 622px, 898px" />
```
Let's say on tablet initially the `beat-home-mobile_desktop.png` of 622px width is loaded since it's in the `src` attribute. Then it will be replaced by `home-mobile_tablet.png` which is 535px wide. This causes a flick.

</summary>
</details>

<details>
	<summary>###Displays a responsive image

</summary>
* Creates a placeholder image.

* Displays a placeholder image if the original image is missing

* Sets a responsive width for each breakpoint to avoid image flicking

* Returns a ProgressiveImage if requested. Otherwise a responsive HTML image

</details>

