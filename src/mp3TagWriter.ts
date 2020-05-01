import ID3Writer from "browser-id3-writer";
import { TagWriter } from "./tagWriter";

export class Mp3TagWriter implements TagWriter {
  private writer: ID3Writer;

  constructor(buffer: ArrayBuffer) {
    this.writer = new ID3Writer(buffer);
  }

  setTitle(title: string) {
    this.writer.setFrame("TIT2", title);
  }

  setArtists(artists: string[]) {
    this.writer.setFrame("TPE1", artists);
  }

  setAlbum(album: string) {
    this.writer.setFrame("TALB", album);
  }

  setComment(comment: string) {
    this.writer.setFrame("COMM", {
      text: comment,
      description: "",
    });
  }

  setArtwork(artworkBuffer: ArrayBuffer) {
    this.writer.setFrame("APIC", {
      type: 3,
      data: artworkBuffer,
      description: "",
    });
  }

  async getBuffer() {
    this.writer.addTag();

    return await this.writer.getBlob().arrayBuffer();
  }
}