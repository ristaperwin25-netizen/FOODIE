Create a polished, editable desktop web UI/UX prototype for a food discovery website called **FOODIE**.

IMPORTANT:

* This is a DESKTOP WEBSITE, not a mobile app.
* Use a 1440 × 1024 desktop frame as the main design size.
* The design must be fully editable in Figma.
* Use Auto Layout wherever practical.
* Create reusable components and variants for buttons, navigation, restaurant cards, filter chips, tags, modal dialogs, parking cards, and recommendation cards.
* Organize the Figma file clearly with named pages and frames.
* The prototype must be clickable and must have NO dead-end interactions.
* Preserve the FOODIE visual identity described below.
* Prioritize clean UI hierarchy, consistency, spacing, accessibility, and realistic interaction states.

## BRAND

Brand name: FOODIE

Tagline:
"Discover something worth eating."

Main purpose:
FOODIE helps users discover restaurants around Slipi and Central Park, especially when they do not know what to eat.

Key features:

1. Personalized food recommendation
2. Restaurant discovery
3. Restaurant filtering
4. Food search
5. Parking availability
6. Group-size based recommendations
7. FOODIE Card membership
8. Restaurant location / Google Maps action

Target area:
Slipi • Central Park • Jakarta

## VISUAL IDENTITY

Primary color:
#2B7A78

Dark green:
#153F3D

Deep footer green:
#102F2D

Accent orange:
#F4A261

Light green:
#EDF7F5

Warm cream:
#FFF8EF

Light background:
#F7F8F6

Main text:
#222222

Secondary text:
#666666 / #777777

Use:

* Green for primary actions, active states, brand identity, and recommendation actions.
* Orange for accents, highlights, important secondary actions, and food-related emphasis.
* White cards on an off-white background.
* Rounded cards and buttons.
* Soft shadows.
* Generous whitespace.
* Modern but approachable food-discovery aesthetic.

Typography:
Use a clean modern sans-serif such as Inter.
Use clear hierarchy:

* H1: 52–60 px
* H2: 30–36 px
* H3: 18–22 px
* Body: 15–18 px
* Caption: 12–14 px

## GLOBAL NAVIGATION

Create a sticky desktop navigation bar.

Left:
FOODIE logo.

Navigation:

* Discover
* Parking
* For You
* How It Works

Right:
"My Profile" button.

Navigation interactions:

* Discover → Discover section/page
* Parking → Parking page/section
* For You → Recommendation page/section
* How It Works → How It Works section
* My Profile → Profile screen

The navigation must remain consistent across relevant screens.

## SCREEN 1 — WELCOME / PARTY SIZE MODAL

When the prototype starts, display a centered welcome modal over the homepage.

Modal title:
"👋 Welcome to FOODIE"

Text:
"Before we recommend a place, tell us how many people are eating with you."

Party-size options:

* 1
* 2
* 3
* 4+

Also provide:
"Or enter the exact number of people"

Primary button:
"Find My Food"

Interactions:

* Selecting a party size changes the selected visual state.
* Selecting 4+ activates the group recommendation behavior.
* Custom number input should visually replace the selected preset.
* Find My Food closes the modal and takes the user to the recommendation/discovery experience.
* If possible in Figma prototype, demonstrate separate states for normal group and large group.

## SCREEN 2 — HOMEPAGE / DISCOVER

Hero section:

Small label:
"YOUR PERSONAL FOOD GUIDE"

Main heading:
"Not sure what to eat? We've got you."

Supporting text:
"Discover hidden gems, highly-rated restaurants, affordable meals, and places with available parking around Slipi and Central Park."

Primary CTA:
"Recommend Something"

Secondary CTA:
"Explore Restaurants"

Interactions:

* Recommend Something → For You / Recommendation screen.
* Explore Restaurants → Discover Restaurants screen.

Below hero, create search card:

Heading:
"What are you craving?"

Search field placeholder:
"Try: Japanese, cheap food, dessert..."

Search button:
"Search"

Search interaction should lead to filtered restaurant results.

## SCREEN 3 — DISCOVER RESTAURANTS

Heading:
"Discover Around You"

Subtitle:
"Restaurants around Slipi & Central Park"

Create filter chips:

* All
* 💎 Hidden Gems
* ⭐ Highly Rated
* 💰 Budget Friendly
* 🚗 Easy Parking

Filter chips must have active/inactive states.

Create a 3-column responsive desktop restaurant grid.

Restaurant cards should include:

* Restaurant image
* Restaurant name
* Rating
* Category
* Price range
* Tags
* Review count
* View button

Use these restaurant examples:

1. Rempah Bistro
   Rating: 4.4
   Category: Indonesian • Central Park
   Price: Rp 50K – 100K
   Reviews: 740+
   Tags: Hidden Gem, Indonesian, Parking, Group Friendly

2. Baia Nonna
   Rating: 4.9
   Category: Southeast Asian • Tribeca
   Price: Rp 50K – 150K
   Reviews: 1,100+
   Tags: Highly Rated, Parking

3. Katsukita
   Rating: 4.9
   Category: Japanese • Central Park
   Price: Rp 50K – 150K
   Reviews: 4,300+
   Tags: Highly Rated, Japanese, Parking

4. Song Fa Bak Kut Teh
   Rating: 4.8
   Category: Singaporean • Central Park
   Price: Rp 100K – 200K
   Reviews: 2,100+
   Tags: Highly Rated, Singaporean

5. Dandang Gulo
   Rating: 4.9
   Category: Indonesian • Palmerah
   Price: Rp 50K – 100K
   Reviews: 380+
   Tags: Hidden Gem, Nusantara

6. Remboelan
   Rating: 4.8
   Category: Indonesian • Central Park
   Price: Rp 75K – 150K
   Reviews: 3,500+
   Tags: Highly Rated, Parking, Group Friendly

Clicking "View" should open a restaurant detail screen or modal.

Restaurant detail must contain:

* Large image
* Restaurant name
* Rating
* Category
* Price
* Tags
* Description
* Location
* "Open in Google Maps" CTA
* Back to Discover CTA

## SCREEN 4 — PERSONAL RECOMMENDATION

Heading:
"Your Recommendation"

Subtitle:
"Based on rating, price, popularity and hidden-gem potential"

Create a large recommendation card.

Example:
94% Match

Rempah Bistro

"A hidden gem for Indonesian food with a reasonable price and a strong rating."

Information:
⭐ 4.4 Rating
💰 Rp 50K–100K
💎 Hidden Gem

Buttons:
"🔄 Give Me Another Choice"
"📍 Open in Google Maps"

Create multiple recommendation states:

State A:
Rempah Bistro — 94% Match

State B:
Baia Nonna — 91% Match

State C:
Katsukita — 89% Match

State D:
Dandang Gulo — 96% Match

The "Give Me Another Choice" interaction should cycle between recommendation states.

For 4+ people, prioritize group-friendly restaurants and display a message explaining that the recommendation considers larger seating/group dining.

## SCREEN 5 — PARKING

Create a dedicated Parking screen.

Dark green section.

Heading:
"Check Parking Before You Go 🚗"

Supporting text:
"Choose your vehicle and see the parking situation before heading to your restaurant."

Vehicle selector:

* 🚗 Car
* 🏍️ Motorcycle

Parking cards:

1. Central Park — Car Parking — Available
2. Central Park — Motorcycle Parking — Limited
3. Taman Anggrek — Car Parking — Available

Create a detailed parking availability panel:

Central Park — Car Parking

Legend:
Green = more spaces
Orange = limited
Red = almost full

Floors:
B1 — 75% free
B2 — 60% free
B3 — 30% free
B4 — 8% free

Use horizontal availability bars.

Vehicle buttons must have active/inactive states.

## SCREEN 6 — FOODIE CARD

Create a FOODIE Card promotional section.

Heading:
"Meet the FOODIE Card 💳"

Description:
"Use your FOODIE Card to unlock parking benefits and exclusive restaurant promotions."

Benefits:
🚗 Parking Benefits
🏷️ Exclusive Discounts
🍽️ Restaurant Deals
⭐ Member Rewards

Example deal:
"Get 15% off at selected partner restaurants when you pay with FOODIE Card."

CTA:
"Apply for FOODIE Card"

Clicking the CTA should open a simple application modal:

Title:
"Apply for FOODIE Card"

Fields:

* Full Name
* Email
* Phone Number

CTA:
"Continue Application"

After clicking:
show confirmation state:
"Application Started"
"You can continue your registration and payment in the full FOODIE experience."

## SCREEN 7 — HOW FOODIE WORKS

Heading:
"How FOODIE Works"

Subtitle:
"Finding your next meal in three simple steps."

Three steps:

1
"Tell Us What You Want"
"Choose your budget, food preference, rating preference, and location."

2
"We Find Your Match"
"FOODIE compares ratings, prices, distance and hidden-gem potential."

3
"Check Parking & Go"
"Check parking availability before you leave and enjoy your meal."

## SCREEN 8 — PROFILE

Create a simple My Profile screen.

Include:

* User name
* Party preference
* Favorite cuisines
* Budget preference
* Saved restaurants
* FOODIE Card status

Buttons:
"Edit Preferences"
"Saved Restaurants"
"FOODIE Card"

## FOOTER

Dark green footer.

FOODIE

"Discover something worth eating."

"Slipi • Central Park • Jakarta"

## PROTOTYPE FLOW

Connect the prototype exactly like this:

START
↓
Welcome / Party Size Modal
↓
Homepage
↓
Recommend Something
↓
Personal Recommendation
↓
Give Me Another Choice
↓
Next Recommendation
↓
Open in Google Maps / external action

Homepage
↓
Explore Restaurants
↓
Discover Restaurants
↓
Filter Restaurants
↓
Restaurant Detail
↓
Open in Google Maps

Homepage
↓
Search
↓
Filtered Restaurant Results
↓
Restaurant Detail

Navigation:
Discover → Discover Restaurants
Parking → Parking
For You → Recommendation
How It Works → How It Works
My Profile → Profile

Parking:
Parking
↓
Select Car / Motorcycle
↓
Updated Parking State

FOODIE Card:
Homepage / FOODIE Card section
↓
Apply for FOODIE Card
↓
Application Modal
↓
Confirmation State

## COMPONENT SYSTEM

Create reusable Figma components:

1. Navbar
2. Primary Button
3. Secondary Button
4. Filter Chip
5. Restaurant Card
6. Restaurant Tag
7. Rating Badge
8. Parking Card
9. Recommendation Card
10. Modal
11. Input Field
12. Vehicle Selector
13. Navigation Item
14. Footer
15. FOODIE Card

Create variants for:

* Default
* Hover
* Active
* Disabled
* Selected

## FILE ORGANIZATION

Create these Figma pages:

01 — Cover
02 — Design System
03 — Components
04 — User Flow
05 — Desktop Screens
06 — Prototype
07 — Presentation Assets

Name frames clearly, for example:

01_Welcome
02_Home
03_Discover
04_Restaurant_Detail
05_Recommendation
06_Parking
07_FOODIE_Card
08_How_It_Works
09_Profile

Keep all layers clearly named.

Use Auto Layout and reusable components rather than manually duplicated elements.

The final result should look like a professional university UI/UX project rather than a generic AI-generated website.
