import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.html',
  styleUrl: './tab.scss',
  imports: [Breadcrumb, MatCardModule, MatTabsModule, RouterLinkActive, RouterLink, RouterOutlet],
})
export class TabDemo {
  // Nav bar demo
  tabLinks = [
    { label: 'Sun', link: 'sunny-tab' },
    { label: 'Rain', link: 'rainy-tab' },
    { label: 'Fog', link: 'foggy-tab' },
  ];

  // Standard tabs demo
  tabs = [
    {
      label: 'German Shepherd',
      content: `The German Shepherd is a breed of medium to large-sized working dog that originated
          in Germany. The breed's officially recognized name is German Shepherd Dog in the
          English language. The breed is also known as the Alsatian in Britain and Ireland.`,
    },
    {
      label: 'Labrador Retriever',
      extraContent: true,
      content: `The Labrador Retriever, also Labrador, is a type of retriever-gun dog. The Labrador
          is one of the most popular breeds of dog in the United Kingdom and the United States.`,
    },
    {
      label: 'Rottweiler',
      disabled: true,
      content: `The Rottweiler is a breed of domestic dog, regarded as medium-to-large or large.
          The dogs were known in German as Rottweiler Metzgerhund, meaning Rottweil butchers' dogs,
          because their main use was to ...`,
    },
    {
      label: 'Beagle',
      content: `The Beagle is a breed of small hound, similar in appearance to the much larger
          foxhound. The beagle is a scent hound, developed primarily for hunting hare.`,
    },
  ];
}

@Component({
  selector: 'sunny-routed-content',
  template: 'Having a lot of light from the sun.',
})
export class SunnyTabContent {}

@Component({
  selector: 'rainy-routed-content',
  template: 'A rainy period of time is one when it rains a lot',
})
export class RainyTabContent {}

@Component({
  selector: 'foggy-routed-content',
  template: 'If the weather is foggy, there is fog',
})
export class FoggyTabContent {}
