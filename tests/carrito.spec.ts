import { test, expect } from "@playwright/test";

test("Agregar y eliminar del carrito", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Selecciono el producto de pallet de 198 unidades
  const productCard = page.locator('[data-id="100012"]');

  // Hago click en el boton de agregar al carrito
  const addToCartButton = productCard.locator(
    'button:has-text("Agregar al carrito")'
  );
  await addToCartButton.click();

  // Hago click en el boton del carrito para abrir el drawer lateral
  const cartDrawer = page.locator('[data-item="cart-drawer"]');
  const cartButton = page.locator('[data-action="open-cart"]');
  await cartButton.click();

  // Compruebo que el drawer se muestre en pantalla
  await expect(cartDrawer).not.toHaveClass(/.*translate-x-full.*/);

  // Compruebo que el item fue agregado correctamente al carrito
  const cartTable = page.locator('[data-item="cart-table"]');
  const itemInCart = cartTable.locator('[data-id="100012"]');
  await expect(itemInCart).toBeVisible();

  // Hago click en el boton para eliminar del carrito y compruebo que se elimine de este
  const removeFromCartButton = productCard.locator(
    'button:has-text("Eliminar del carrito")'
  );
  await removeFromCartButton.click();
  await expect(itemInCart).toBeHidden();

  // Hago click en el boton para cerrar el drawer del carrito y compruebo que se haya cerrado
  const closeCartButton = page.locator('[data-action="close-cart"]');
  await closeCartButton.click();
  await expect(cartDrawer).toHaveClass(/.*translate-x-full.*/);
});

test("Verificar producto sin stock", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Selecciono el producto de Cemento Portland 50kg que no tiene stock disponible
  const productCard = page.locator('[data-id="40001"]');

  // Verifico que aparezca el mensaje de "Stock no disponible"
  const stockMessage = productCard.locator('[data-item="stock"]');
  await expect(stockMessage).toHaveText("Stock no disponible");

  // Y que el boton de "Sin Stock" aparezca y este deshabilitado
  const noStockButton = productCard.locator('button:has-text("Sin stock")');
  await expect(noStockButton).toBeVisible();
  await expect(noStockButton).toBeDisabled();
});
