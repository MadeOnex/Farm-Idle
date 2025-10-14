<?php
session_start();
if (empty($_SESSION["username"])) {
    setcookie("flash_text", "Bitte zuerst einloggen", time() + 30, "/");
    setcookie("flash_ok", "0", time() + 30, "/");
    setcookie("flash_tab", "login", time() + 30, "/");
    header("Location: ../login.html");
    exit;
}
$username = htmlspecialchars($_SESSION["username"] ?? "User");
?>

<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Farm-Idle</title>

    <link rel="stylesheet" href="./style/style.css">

    <script defer src="./js/config.js"></script>
    <script defer src="./js/base.js"></script>
    <script defer src="./js/inventory.js"></script>
</head>

<body>
    <div class="layout">
        <!-- Seitenbar -->
        <aside class="sidebar">
            <strong>Farm Idle</strong>
            <ul class="nav">
                <li><a href="#tab-farm" id="nav-farm" class="active"><img class="icon"
                            src="./img/svg/building-cottage.svg" alt="Farm" />Farm</a></li>
                <li><a href="#tab-process" id="nav-process"><img class="icon" src="./img/svg/settings.svg"
                            alt="Verarbeitung" />Verarbeitung</a></li>
                <li><a href="#tab-markt" id="nav-markt"><img class="icon" src="./img/svg/building-store.svg"
                            alt="Markt" />Markt</a></li>
                <li><a href="#tab-inventory" id="nav-inventory"><img class="icon" src="./img/svg/building-warehouse.svg"
                            alt="Inventory" />Inventory</a></li>
            </ul>
        </aside>

        <!-- Hud Header -->
        <div class="content">
            <header class="topbar">
                <div class="hud"><span>Gold: <b id="hud-gold">0</b></span><span>Inventar: <b
                            id="hud-inventory">0</b></span>
                </div>
                <div class="hud">
                    <span class="user"> <?= $username ?> </span>
                    <button type="button" class="btn btn-ghost" id="btn-save"><b>Speichern</b></button>
                    <a href="./php/logout.php" class="btn btn-ghost"><b>Logout</b></a>
                </div>
                
            </header>

            <main>

                <!-- Farm-Tab -->
                <section id="tab-farm" class="is-active">
                    <h2 class="tab-title">Farm</h2>

                    <!-- Saat -->
                    <nav class="toolbar">
                        <button type="button" class="btn btn-ghost"><img class="icon"
                                src="./img/Crops/Farming-Wheat.png" alt="Weizen" /><b>Weizen</b></button>
                        <button type="button" class="btn btn-ghost"><img class="icon"
                                src="./img/Crops/Vegetables-Cornpng.png" alt="Mais" /><b>Mais</b></button>
                        <button type="button" class="btn btn-ghost"><img class="icon"
                                src="./img/Crops/Allergens-Soy-Bean.png" alt="Soja" /><b>Soja</b></button>
                    </nav>

                    <!-- Felder Card -->
                    <div class="grid">
                        <article class="card">
                            <h3>Field #1</h3>
                            <p class="muted">Status</p>
                            <div class="row"><img class="icon" src="./img/Crops/Farming-Wheat.png" alt="Weizen" />Weizen
                            </div>
                            <div class="row muted">Statrow</div>
                            <div class="progress" data-value="40"></div>
                            <button class="btn">Säen</button>
                        </article>

                        <article class="card">
                            <h3>Field #2</h3>
                            <p class="muted">Status</p>
                            <div class="row"><img class="icon" src="./img/Crops/Farming-Wheat.png" alt="Weizen" />Weizen
                            </div>
                            <div class="row muted">Statrow</div>
                            <div class="progress" data-value="10"></div>
                            <button class="btn">Säen</button>
                        </article>

                        <article class="card">
                            <h3>Field #3</h3>
                            <p class="muted">Status</p>
                            <div class="row"><img class="icon" src="./img/Crops/Farming-Wheat.png" alt="Weizen" />Weizen
                            </div>
                            <div class="row muted">Statrow</div>
                            <div class="progress" data-value="0"></div>
                            <button class="btn">Säen</button>
                        </article>

                        <!-- Template -->
                        <template id="tpl-field">
                            <article class="card" data-field-id="">
                                <h3 data-ref="title">Field #X</h3>
                                <p class="muted" data-ref="status">Status</p>
                                <div class="row">
                                    <img class="icon" data-ref="cropIcon" alt="" />
                                    <span data-ref="cropName">Crop</span>
                                </div>
                                <div class="row muted" data-ref="stats">—</div>
                                <div class="progress" data-value="0"></div>
                                <button class="btn" data-action="sow">Säen</button>
                            </article>
                        </template>
                    </div>
                </section>

                <!-- Verarbeitung -->
                <section id="tab-process">
                    <h2 class="tab-title">Verarbeitung</h2>

                    <!-- Rezepte Card -->
                    <div class="grid">
                        <article class="card">
                            <h3>Rezept #1</h3>
                            <p class="subtext">Weizen → Mehl (30s)</p>
                            <div class="row"><img class="icon" src="./img/Process/Cake-Flour.png"
                                    alt="Mehl" /><span>Mehl</span></div>
                            <div class="row"><span>Kosten:</span><span>2</span><img class="icon"
                                    src="./img/Crops/Farming-Wheat.png" alt="Weizen" /></div>
                            <div class="row"><span>Verfügbar:</span><span>x</span><img class="icon"
                                    src="./img/Crops/Farming-Wheat.png" alt="Weizen" /></div>
                            <button class="btn">Start</button>
                        </article>

                        <article class="card">
                            <h3>Rezept #2</h3>
                            <p class="subtext">Mais → Popcorn (45s)</p>
                            <div class="row"><img class="icon" src="./img/Process/Popcorn.svg"
                                    alt="Popcorn" /><span>Popcorn</span>
                            </div>
                            <div class="row"><span>Kosten:</span><span>2</span><img class="icon"
                                    src="./img/Crops/Vegetables-Cornpng.png" alt="Mais" /></div>
                            <div class="row"><span>Verfügbar:</span><span>x</span><img class="icon"
                                    src="./img/Crops/Vegetables-Cornpng.png" alt="Mais" /></div>
                            <button class="btn">Start</button>
                        </article>

                        <article class="card">
                            <h3>Rezept #3</h3>
                            <p class="subtext">Soja → Öl (60s)</p>
                            <div class="row"><img class="icon" src="./img/Process/soy_glass_5037435.png"
                                    alt="Soja Öl" /><span>Soja
                                    Öl</span></div>
                            <div class="row"><span>Kosten:</span><span>2</span><img class="icon"
                                    src="./img/Crops/Allergens-Soy-Bean.png" alt="Soja" /></div>
                            <div class="row"><span>Verfügbar:</span><span>x</span><img class="icon"
                                    src="./img/Crops/Allergens-Soy-Bean.png" alt="Soja" /></div>
                            <button class="btn">Start</button>
                        </article>

                        <!-- Template -->
                        <template id="tpl-recipe">
                            <article class="card" data-recipe-id="">
                                <h3 data-ref="title">Rezept</h3>
                                <p class="subtext" data-ref="subtitle">A → B (Xs)</p>
                                <div class="row">
                                    <img class="icon" data-ref="outIcon" alt="" />
                                    <span data-ref="outName">Output</span>
                                </div>
                                <div class="row">
                                    <span>Kosten:</span>
                                    <span data-ref="costAmount">0</span>
                                    <img class="icon" data-ref="costIcon" alt="" />
                                </div>
                                <div class="row">
                                    <span>Verfügbar:</span>
                                    <span data-ref="available">0</span>
                                    <img class="icon" data-ref="availIcon" alt="" />
                                </div>
                                <button class="btn" data-action="start">Start</button>
                            </article>
                        </template>
                    </div>

                    <!-- Aktive Jobs -->
                    <h3 class="tab-title">Aktive Jobs <small>0/3</small></h3>
                    <div class="grid">
                        <article class="card">
                            <div class="row"><img class="icon" src="./img/Process/Cake-Flour.png"
                                    alt="" /><strong>Mehl</strong><span class="badge">läuft</span></div>
                            <div class="progress" data-value="66"></div>
                            <div class="row spread"><small>Noch 25 s</small><button
                                    class="btn btn-ghost">Abbrechen</button></div>
                        </article>

                        <article class="card">
                            <div class="row"><img class="icon" src="./img/Process/Cake-Flour.png"
                                    alt="" /><strong>Mehl</strong><span class="badge">läuft</span></div>
                            <div class="progress" data-value="20"></div>
                            <div class="row spread"><small>Noch 25 s</small><button
                                    class="btn btn-ghost">Abbrechen</button></div>
                        </article>

                        <!-- Template -->
                        <template id="tpl-job">
                            <article class="card" data-job-id="">
                                <div class="row">
                                    <img class="icon" data-ref="prodIcon" alt="" />
                                    <strong data-ref="prodName">Produkt</strong>
                                    <span class="badge" data-ref="state">läuft</span>
                                </div>
                                <div class="progress" data-value="0"></div>
                                <div class="row spread">
                                    <small data-ref="timeLeft">Noch 0 s</small>
                                    <button class="btn btn-ghost" data-action="cancel">Abbrechen</button>
                                </div>
                            </article>
                        </template>
                    </div>
                </section>

                <!-- Markt Tab -->
                <section id="tab-markt">
                    <h2 class="tab-title">Markt</h2>
                    <h3 class="tab-subtitle">Aktuelle Marktpreise</h3>

                    <!-- Markt Card -->
                    <div class="grid">
                        <article class="card">
                            <h3 class="item-title">Weizen</h3>
                            <p class="subtext price">Preis/Stück: 1.20 G</p>
                            <div class="row"><img class="icon" src="./img/Crops/Farming-Wheat.png"
                                    alt="Weizen" /><span>Bestand <b class="stock">12</b></span></div>
                            <div class="stack">
                                <label class="row">Menge: <input class="qty" type="number" value="10" min="1"
                                        step="1" /></label>
                                <button type="button" class="btn">Verkaufen</button>
                            </div>
                        </article>

                        <article class="card">
                            <h3 class="item-title">Weizen</h3>
                            <p class="subtext price">Preis/Stück: 1.20 G</p>
                            <div class="row"><img class="icon" src="./img/Crops/Farming-Wheat.png"
                                    alt="Weizen" /><span>Bestand <b class="stock">12</b></span></div>
                            <div class="stack">
                                <label class="row">Menge: <input class="qty" type="number" value="10" min="1"
                                        step="1" /></label>
                                <button type="button" class="btn">Verkaufen</button>
                            </div>
                        </article>

                        <!-- Template -->
                        <template id="tpl-market-item">
                            <article class="card" data-item-id="">
                                <h3 class="item-title" data-ref="itemName">Item</h3>
                                <p class="subtext price">Preis/Stück: <span data-ref="price">0</span> <span
                                        data-ref="unit">G</span></p>
                                <div class="row">
                                    <img class="icon" data-ref="icon" alt="" />
                                    <span>Bestand <b class="stock" data-ref="stock">0</b></span>
                                </div>
                                <div class="stack">
                                    <label class="row">Menge:
                                        <input class="qty" type="number" value="1" min="1" step="1" data-ref="qty" />
                                    </label>
                                    <button type="button" class="btn" data-action="sell">Verkaufen</button>
                                </div>
                            </article>
                        </template>
                    </div>
                </section>

                <!-- Inventar Tab -->
                <section id="tab-inventory">
                    <h2 class="tab-title">Inventory</h2>

                    <!-- Inventar Card -->
                    <div id="inv-list" class="grid">

                        <!-- Template -->
                        <template id="tpl-inventory-item">
                            <article class="card" data-item-id="">
                                <h3 class="item-title" data-ref="itemName">Item</h3>
                                <div class="row">
                                    <img class="icon" data-ref="icon" alt="" />
                                    <span>Bestand: <b class="stock" data-ref="stock">0</b></span>
                                </div>
                            </article>
                        </template>

                    </div>


                </section>
            </main>
        </div>
    </div>
</body>

</html>