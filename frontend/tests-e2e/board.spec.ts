import { expect, Locator, Page, test } from "@playwright/test";

async function dragCard(page: Page, source: Locator, target: Locator) {
  const sourceBox = await source.boundingBox();
  const targetBox = await target.boundingBox();
  if (!sourceBox || !targetBox) throw new Error("Could not measure drag elements");

  await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(sourceBox.x + sourceBox.width / 2 + 10, sourceBox.y + sourceBox.height / 2 + 10, {
    steps: 5,
  });
  await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, {
    steps: 10,
  });
  await page.mouse.up();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("loads with the board and dummy data populated", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Kanban Board" })).toBeVisible();
  await expect(page.getByText("Backlog")).toBeVisible();
  await expect(page.getByText("To Do")).toBeVisible();
  await expect(page.getByText("In Progress")).toBeVisible();
  await expect(page.getByText("In Review")).toBeVisible();
  await expect(page.getByText("Done")).toBeVisible();
  await expect(page.getByText("Research competitor products")).toBeVisible();
});

test("adds a new card to a column", async ({ page }) => {
  const backlogColumn = page.getByTestId("column-backlog");
  await page.getByRole("button", { name: "+ Add card" }).first().click();
  await page.getByPlaceholder("Card title").fill("Playwright test card");
  await page.getByPlaceholder("Details").fill("Added during e2e test");
  await backlogColumn.getByRole("button", { name: "Add card" }).click();

  await expect(backlogColumn.getByText("Playwright test card")).toBeVisible();
});

test("deletes a card", async ({ page }) => {
  const card = page.getByTestId("card-card-9");
  await expect(card).toBeVisible();
  await card.hover();
  await card.getByRole("button", { name: "Delete Choose tech stack" }).click();

  await expect(page.getByText("Choose tech stack")).toHaveCount(0);
});

test("renames a column", async ({ page }) => {
  const column = page.getByTestId("column-in-review");
  await column.getByText("In Review", { exact: true }).click();
  const input = column.getByRole("textbox");
  await input.fill("Reviewing");
  await input.press("Enter");

  await expect(column.getByText("Reviewing", { exact: true })).toBeVisible();
  await expect(page.getByText("In Review", { exact: true })).toHaveCount(0);
});

test("drags a card from one column to another", async ({ page }) => {
  const card = page.getByTestId("card-card-1");
  const targetDropzone = page.getByTestId("column-dropzone-todo");
  const targetColumn = page.getByTestId("column-todo");

  await expect(page.getByTestId("column-backlog").getByText("Research competitor products")).toBeVisible();

  await dragCard(page, card, targetDropzone);

  await expect(targetColumn.getByText("Research competitor products")).toBeVisible();
  await expect(page.getByTestId("column-backlog").getByText("Research competitor products")).toHaveCount(0);
});
