// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{SystemTray};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


// #[tauri::command]
// fn get_api_key() -> String {
//     let mut settings = config::Config::default();
//     settings.merge(config::File::with_name("settings")).unwrap();
//     let api_key = settings.get_str("api_key").unwrap();
//     api_key
// }

use tauri::{CustomMenuItem, Manager, Menu, Submenu, SystemTrayEvent, SystemTrayMenu};

fn main() {
    let add_api_key = CustomMenuItem::new("add_api_key".to_string(), "Add API Key");
    let settings = CustomMenuItem::new("settings".to_string(), "Settings");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let submenu = Submenu::new(
        "Options",
        Menu::new()
            .add_item(add_api_key)
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
              
            }
            _ => {}
        })
        // .on_window_event(|event| match event.event() {
        //     tauri::WindowEvent::Focused(is_focused) => {
        //         // detect click outside of the focused window and hide the app
        //         if !is_focused {
        //             event.window().hide().unwrap();
        //         }
        //     }
        //     _ => {}
        // })
        .invoke_handler(tauri::generate_handler![greet])
        .plugin(tauri_plugin_store::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
