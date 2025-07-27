# 📬 Message Flow System

The Message Flow System is a visual workflow tool designed to model and automate communication steps across different channels. It currently supports two types of nodes messages and emails, enabling users to define how information flows through a sequence. This tool serves as the foundation for building intelligent, multi-channel communication pipelines.

## Visit app live

Hosted on vercel: visit at https://bitespeed-chatbot.vercel.app/

## Demo Videos

https://github.com/user-attachments/assets/5414b37b-065e-4773-bbfe-9ac8de62e9a5

# Future Improvements for Message Flow System

1. **Add Message Providers**  
   Allow each node to specify its provider (e.g., WhatsApp, Slack, Gmail, Outlook). This enables multi-platform communication support and provider-specific configurations.

2. **Add Priority Levels**  
   Assign priorities to nodes such as `normal`, `important`, `critical`, which could influence delivery order or styling in the UI.

3. **Scheduling Support**  
   Add ability to schedule when a message/email should be sent (e.g., send at a specific date/time or after a delay).

## 🛠️ Tech Stack / Libraries Used

- [**Next.js**](https://nextjs.org/)

- [**React Flow**](https://reactflow.dev/)  
  Library for building node-based UIs, used here to visually represent and edit the message flow graph.

- [**Tailwind CSS**](https://tailwindcss.com/)  
  Utility-first CSS framework for building modern, responsive, and consistent UIs with minimal custom CSS.

## Play in local env

clone, install dependecies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📬 Contact

[📧 amitdhaterwal12@gmail.com](mailto:amitdhaterwal12@gmail.com)
