import { test, expect } from "@playwright/test";

test("Group counter", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Selecciono el producto de pallet de 198 unidades con counter group
  const productCard = page.locator('[data-id="100012"]');

  // Sumo un grupo de unidades al carrito
  const addGroup = productCard.locator('[data-action="add-unit"]');
  await addGroup.click();

  // Verifico que el boton haya cambiado a "Eliminar del carrito"
  const removeFromCartButton = productCard.locator(
    'button:has-text("Eliminar del carrito")'
  );
  await expect(removeFromCartButton).toBeVisible();

  // Verifico que el counter de grupos sea igual a 1
  const groupCounter = productCard.locator('[data-item="unit-counter-input"]');
  await expect(groupCounter).toHaveValue("1");

  // Y el counter que cuenta las unidades totales sea igual a la cantidad de unidades que contiene el pallet (198 unidades)
  const unitsCounter = productCard.locator('[data-item="units-counter-input"]');
  await expect(unitsCounter).toHaveValue("198");

  // Al eliminar al unico grupo, verifico que el boton haya pasado a "Agregar al carrito"
  const subtractGroup = productCard.locator('[data-action="subtract-unit"]');
  await subtractGroup.click();
  const addToCartButton = productCard.locator(
    'button:has-text("Agregar al carrito")'
  );
  await expect(addToCartButton).toBeVisible();

  // Sumo 6 grupos mas, como el stock maximo es 5 deberia quedar limitado a 5 grupos y no 6
  for (let i = 0; i < 6; i++) {
    await addGroup.click();
  }

  // Compruebo que sean 5 grupos y 990 unidades
  await expect(groupCounter).toHaveValue("5");
  await expect(unitsCounter).toHaveValue("990");

  // Compruebo que al cargar 400 ladrillos, me actualice el valor de los pallets a 3 y
  // las unidades se actualicen a 594 (que son las unidades que traen 3 pallets)
  unitsCounter.fill("400");
  await page.waitForTimeout(2100);
  await expect(groupCounter).toHaveValue("3");
  await expect(unitsCounter).toHaveValue("594");

  // Al eliminar del carrito espero que tenga 0 grupos y 0 unidades
  await removeFromCartButton.click();
  await expect(groupCounter).toHaveValue("0");
  await expect(unitsCounter).toHaveValue("0");
});

test("Area counter", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Selecciono el producto de ceramicos que cubren 2.68m2 de superficie
  const productCard = page.locator('[data-id="2060"]');

  // Sumo una caja de ceramicos al carrito
  const addGroup = productCard.locator('[data-action="add-unit"]');
  await addGroup.click();

  // Verifico que el boton haya cambiado a "Eliminar del carrito"
  const removeFromCartButton = productCard.locator(
    'button:has-text("Eliminar del carrito")'
  );
  await expect(removeFromCartButton).toBeVisible();

  // Verifico que el counter de cajas sea igual a 1
  const groupCounter = productCard.locator('[data-item="unit-counter-input"]');
  await expect(groupCounter).toHaveValue("1");

  // Y el counter que cuenta la superficie sea igual a 2.68m2 que es lo que cubre la caja de ceramicos
  const areaCounter = productCard.locator('[data-item="area-input"]');
  await expect(areaCounter).toHaveValue("2.68");

  // Al eliminar la unica caja de ceramicos, verifico que el boton haya pasado a "Agregar al carrito"
  const subtractGroup = productCard.locator('[data-action="subtract-unit"]');
  await subtractGroup.click();
  const addToCartButton = productCard.locator(
    'button:has-text("Agregar al carrito")'
  );
  await expect(addToCartButton).toBeVisible();

  // Sumo 6 cajas mas, al ser el stock maximo 5 tambien espero que quede en 5 unidades y no 6
  for (let i = 0; i < 6; i++) {
    await addGroup.click();
  }

  // Compruebo que sean 5 cajas de ceramicos y 990 unidades
  await expect(groupCounter).toHaveValue("5");
  await expect(areaCounter).toHaveValue("13.4");

  // Compruebo que al cargar 6 m2 de superficie, me actualice el valor de las cajas a 3 y
  // la superficie se actualice a 8.04 m2 (que es la superficie que cubren 3 cajas)
  areaCounter.fill("6");
  await page.waitForTimeout(2100);
  await expect(groupCounter).toHaveValue("3");
  await expect(areaCounter).toHaveValue("8.04");

  // Al eliminar del carrito espero que tenga 0 cajas de ceramicos y 0 unidades
  await removeFromCartButton.click();
  await expect(groupCounter).toHaveValue("0");
  await expect(areaCounter).toHaveValue("0");
});

test("Unit counter", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Selecciono el producto de hierros que se compran por unidad
  const productCard = page.locator('[data-id="10035"]');

  const addUnit = productCard.locator('[data-action="add-unit"]');
  const subtractUnit = productCard.locator('[data-action="subtract-unit"]');

  // Sumo una caja de ceramicos al carrito
  await addUnit.click();

  // Verifico que el boton haya cambiado a "Eliminar del carrito"
  const removeFromCartButton = productCard.locator(
    'button:has-text("Eliminar del carrito")'
  );
  await expect(removeFromCartButton).toBeVisible();

  // Verifico que el counter de unidades sea 1
  const unitCounter = productCard.locator('[data-item="unit-counter-input"]');
  await expect(unitCounter).toHaveValue("1");

  // Al eliminar la unidad, espero que se muestre el boton de "Agregar al carrito" nuevamente
  await subtractUnit.click();
  const addToCartButton = productCard.locator(
    'button:has-text("Agregar al carrito")'
  );
  await expect(addToCartButton).toBeVisible();

  // Sumo 6 unidades mas, al ser el stock maximo 5 tambien espero que quede en 5 unidades y no 6
  for (let i = 0; i < 6; i++) {
    await addUnit.click();
  }

  // Compruebo que sean 5 unidades
  await expect(unitCounter).toHaveValue("5");

  // Al eliminar del carrito espero que tenga 0 unidades
  await removeFromCartButton.click();
  await expect(unitCounter).toHaveValue("0");
});
