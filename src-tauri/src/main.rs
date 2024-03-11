// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::SystemTray;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use tauri::{CustomMenuItem, Manager, Menu, Submenu, SystemTrayEvent, SystemTrayMenu};

fn main() {
    let settings = CustomMenuItem::new("settings".to_string(), "Settings");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let submenu = Submenu::new(
        "Options",
        Menu::new()
            .add_item(settings)
            .add_item(quit),
    );
    let tray_menu = SystemTrayMenu::new().add_item(hide);
    let menu = Menu::new().add_submenu(submenu);
    let tray = SystemTray::new().with_menu(tray_menu);
    tauri::Builder::default()
        .menu(menu)
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
                window.set_focus().unwrap();
            }
            _ => {}
        })
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => {
                std::process::exit(0);
            }
            _ => {}
        })
        .on_menu_event(|event| match event.menu_item_id() {
            "settings" => {
                event.window().emit("open_settings", ()).unwrap();
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![greet])
        .plugin(tauri_plugin_store::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
