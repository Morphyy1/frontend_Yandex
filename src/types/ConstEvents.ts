export enum Events {
	CATALOG_UPDATED = 'catalog:changed',         // Было CATALOG_UPDATED
	LOT_OPENED = 'card:open',                    // Было OPEN_LOT
	BASKET_OPENED = 'basket:open',               // Было OPEN_BASKET
	LOT_IN_BASKET_UPDATED = 'lot:changed',       // Было CHANGE_LOT_IN_BASKET
	ORDER_VALIDATED = 'formErrors:changed',      // Было VALIDATE_ORDER
	PAYMENT_STEP_OPENED = 'order_payment:open',  // Было OPEN_FIRST_ORDER_PART
	PAYMENT_STEP_COMPLETED = 'order:submit',     // Было FINISH_FIRST_ORDER_PART
	CONTACTS_STEP_OPENED = 'order_contacts:open',// Было OPEN_SECOND_ORDER_PART
	CONTACTS_STEP_COMPLETED = 'contacts:submit', // Было FINISH_SECOND_ORDER_PART
	ORDER_SUBMITTED = 'order:post',              // Было PLACE_ORDER
	PAYMENT_METHOD_CHANGED = 'payment:changed',  // Было SELECT_PAYMENT
	ADDRESS_CHANGED = 'order.address:change',    // Было INPUT_ORDER_ADDRESS
	EMAIL_CHANGED = 'contacts.email:change',     // Было INPUT_ORDER_EMAIL
	PHONE_CHANGED = 'contacts.phone:change',     // Было INPUT_ORDER_PHONE
	MODAL_OPENED = 'modal:open',                 // Было OPEN_MODAL
	MODAL_CLOSED = 'modal:close',                // Было CLOSE_MODAL
};