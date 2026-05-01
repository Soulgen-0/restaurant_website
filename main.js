const MENU_CARD_CLASS = "menu-card"
const MENU_CARD_ANIMATION_CLASS = MENU_CARD_CLASS + "--visible"
const MENU_CARD_IMAGE_CLASS = MENU_CARD_CLASS + "__image"
const MENU_CARD_INFO_CLASS = MENU_CARD_CLASS + "__info"
const MENU_CARD_TITLE_CLASS = MENU_CARD_CLASS + "__title"
const MENU_CARD_DESCRIPTION_CLASS = MENU_CARD_CLASS + "__description"
const MENU_CARD_PRICE_CLASS = MENU_CARD_CLASS + "__price"
const MENU_GRID_CLASS = "menu__grid"

const FILTER_LIST_CLASS = "filter-list"

const FILTER_BUTTON_CLASS = "filter-button"
const FILTER_BUTTON_ACTIVE = FILTER_BUTTON_CLASS + "--active"

class MenuItem {
    constructor(id, image, imageAlt, title, description, price, type) {
        this.id = id;
        this.image = image;
        this.imageAlt = imageAlt;
        this.title = title;
        this.description = description;
        this.price = price;
        this.type = type;
    }

    toHTML() {
        const menuCard = document.createElement("article");
        const menuCardImage = document.createElement("img");
        const infoContainer = document.createElement("div");
        const title = document.createElement("h3");
        const description = document.createElement("p");
        const price = document.createElement("p");

        menuCard.classList.add(MENU_CARD_CLASS);
        menuCard.append(menuCardImage, infoContainer);
        
        menuCardImage.classList.add(MENU_CARD_IMAGE_CLASS);
        menuCardImage.src = this.image;
        menuCardImage.alt = this.imageAlt;

        infoContainer.classList.add(MENU_CARD_INFO_CLASS);
        infoContainer.append(title, description, price);

        title.classList.add(MENU_CARD_TITLE_CLASS);
        title.textContent = this.title;

        description.classList.add(MENU_CARD_DESCRIPTION_CLASS);
        description.textContent = this.description;

        price.classList.add(MENU_CARD_PRICE_CLASS);
        price.textContent = this.price;

        return menuCard;
    };
}

const MENU_ITEMS = [ 
    new MenuItem(
        1, 
        "/assets/pancakes.jpg", 
        "A stack of 3 pancakes with powdered sugar and fruit on top.",
        "Pancakes",
        "A fluffy stack of pancakes, topped with fruit and powdered sugar.",
        "$10.00",
        "breakfast"
    ),
    new MenuItem(
        2, 
        "/assets/veggie-burger.jpg", 
        "A veggie burger with lettuce, pickles, onions, tomato, cheese and mayonnaise.",
        "Veggie Burger",
        "A delicious vegetable-based burger.",
        "$15.00",
        "dinner"
    ),
    new MenuItem(
        3, 
        "/assets/pina-colada.jpg", 
        "A pina coladas.",
        "Piña Colada",
        "A fresh pina colada made with fresh pineapple juice.",
        "$20.00",
        "drink"
    ),
    new MenuItem(
        4, 
        "/assets/margarita.jpg", 
        "A margarita with a salted rim.",
        "Margarita",
        "A delicious cocktail of tequila, triple sec, lime and a simple syrup served ice cold.",
        "$17.00",
        "drink"
    ),
    new MenuItem(
        5, 
        "/assets/chocolate-cake.jpg", 
        "A chocolate cake slice.",
        "Chocolate Cake Slice",
        "A delicious slice of chocolate cake.",
        "$10.00",
        "dessert"
    ),
    new MenuItem(
        6, 
        "/assets/chicken-alfredo.jpg", 
        "A bowl of chicken alfredo.",
        "Chicken Alfredo",
        "Creamy alfredo pasta with grilled chicken apd parmesan.",
        "$15.00",
        "lunch"
    ),
    new MenuItem(
        7, 
        "/assets/barbecue-bacon-burger.jpg", 
        "A barbecue bacon burger.",
        "BBQ Bacon Burger",
        "A freshly grilled burger topped with bacon and cheese.",
        "$20.00",
        "dinner"
    ),
    new MenuItem(
        8, 
        "/assets/blt.jpg", 
        "A blt sandwich.",
        "BLT Sandwich",
        "A sandwich topped with smoky bacon, crispy lettuce and juicy tomatos.",
        "$12.00",
        "lunch"
    ),
    new MenuItem(
        9, 
        "/assets/omelette.jpg", 
        "An omelette with fresh herbs on top.",
        "Omelette",
        "A fluffy omelette topped with herbs.",
        "$10.00",
        "breakfast"
    ),
    new MenuItem(
        10, 
        "/assets/ice-cream.jpg", 
        "A bowl of french vanilla ice-cream.",
        "Ice Cream",
        "A bowl of creamy french vanilla ice-cream.",
        "$7.00",
        "dessert"
    ),
    new MenuItem(
        11, 
        "/assets/cheese-cake.jpg", 
        "A slice of cheese cake topped with syrup-covered cherries.",
        "Cheese Cake Slice",
        "A slice of creamy cheese cake topped with syrup-covered cherries.",
        "$10.00",
        "dessert"
    ),
    new MenuItem(
        12, 
        "/assets/fruit-punch.jpg", 
        "A glass of fruit punch.",
        "Fruit Punch",
        "A cup of fresh fruit punch with crisp and refreshing fruit chunks.",
        "$8.00",
        "drink"
    ),
]

const ANIMATION_DELAY = 120

function displayMenuItems(menuGrid, menuItems, stagger_placement) {
    menuGrid.innerHTML = "";

    if (stagger_placement) {
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                const card = item.toHTML();
                menuGrid.append(card);

                requestAnimationFrame(() => {
                    card.classList.add(MENU_CARD_ANIMATION_CLASS);
                })
            }, ANIMATION_DELAY * index);
        });
    } else {
        menuItems.forEach(item => {
            const card = item.toHTML();
            card.classList.add(MENU_CARD_ANIMATION_CLASS)
            menuGrid.append(card);
        })
    }
}

function filterMenuItems(menuItems, filterKey) {
    return menuItems.filter(item => item.type === filterKey || filterKey === "all");
}

// Sets up button state tracking.
function setUpButtons(menuGrid) {
    const filterLists = document.getElementsByClassName(FILTER_LIST_CLASS)
    if (!filterLists || filterLists.length < 1) {
        console.error("Could not find the Filter List.");
        return;
    }

    const filterList = filterLists[0];
    const buttons = {};
    for (const button of filterList.getElementsByClassName(FILTER_BUTTON_CLASS)) {
        const category = button.dataset.filter;
        buttons[category] = button;
    }

    let active_category = "all";
    filterList.addEventListener("click", (event) => {
        const button = event.target.closest(`.${FILTER_BUTTON_CLASS}`);
        if (!button) {
            return;
        }

        const category = button.dataset.filter;
        if (category === active_category && active_category === "all") {
            return
        } else if (category === active_category) {
            const lastButton = buttons[active_category];
            lastButton.classList.remove(FILTER_BUTTON_ACTIVE);

            const allButton = buttons["all"];
            allButton.classList.add(FILTER_BUTTON_ACTIVE);
            active_category = "all";
        } else {
            const lastButton = buttons[active_category];
            lastButton.classList.remove(FILTER_BUTTON_ACTIVE);

            const currentButton = buttons[category];
            currentButton.classList.add(FILTER_BUTTON_ACTIVE);
            active_category = category;
        }

        const filtered_items = filterMenuItems(MENU_ITEMS, active_category);
        displayMenuItems(menuGrid, filtered_items, false);
    })
}

const menuGrid = document.getElementsByClassName(MENU_GRID_CLASS);
if (!menuGrid || menuGrid.length < 1) {
    console.error("Could not find the Menu Grid.");
} else {
    displayMenuItems(menuGrid[0], MENU_ITEMS, true);
    setUpButtons(menuGrid[0]);
}