import { Directive, HostListener, HostBinding, ViewChild } from '@angular/core';

@Directive({
    selector: '[appDropdown]',
})

export class DropdownDirective {
    @HostBinding('class.show') isShown = false;

    @HostListener('click', ['$event']) toggleShow(e) {
        this.isShown = !this.isShown; 
        e.target.nextElementSibling.classList.toggle('show');
    }
}