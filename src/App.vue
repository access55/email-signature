<template>
  <v-app class="signature">
    <v-content fill-height>
      <div class="signature__header">
        <access-logo class="logo" /><span>- Email Signature Creator</span>
      </div>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 md4 pa-2>
            <v-card class="elevation-1">
              <v-card-text>
                <v-form>
                  <v-text-field
                    ref="start"
                    tabindex="1"
                    v-model="name"
                    label="Fullname"
                    autocomplete="new-name"
                    type="text"
                  />
                  <v-text-field
                    tabindex="2"
                    v-model="email"
                    label="Email"
                    autocomplete="email"
                    type="email"
                  />
                  <v-switch v-model="showEmail" label="Show email?" />
                  <v-text-field
                    tabindex="2"
                    v-model="title"
                    label="Job Title"
                    autocomplete="new-title"
                    type="text"
                  />
                  <v-text-field
                    tabindex="3"
                    v-model="address"
                    label="Address"
                    autocomplete="new-address"
                    type="text"
                  />
                  <v-text-field
                    tabindex="4"
                    v-model="website"
                    label="Website"
                    autocomplete="new-site"
                    type="text"
                  />
                  <v-text-field
                    tabindex="5"
                    v-model="phone1"
                    label="Phone #1"
                    autocomplete="new-phone1"
                    type="text"
                  />
                  <v-text-field
                    tabindex="6"
                    v-model="phone2"
                    label="Phone #2"
                    autocomplete="new-phone2"
                    type="text"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions class="d-flex">
                <v-btn
                  ref="copy"
                  class="js-copy"
                  color="primary"
                  @click.native.prevent
                  data-clipboard-target="#source"
                >
                  COPY
                </v-btn>
                <v-btn color="secondary" ref="copySrc" class="js-copy-src">
                  COPY HTML
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 md8 pa-2>
            <v-card class="elevation-1" height="100%">
              <div class="signature__source">
                <div ref="sourceWrapper">
                  <table
                    id="source"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      font-family:'Open Sans', Helvetica, Arial, sans-serif;
                      font-size:14px;
                      font-weight:normal;
                      color:#37474f;
                      text-align:left;
                      line-height:20px;
                    "
                  >
                    <tr>
                      <td
                        style="
                          font-size:0px;
                          vertical-align: top;
                          padding-top: 3px;
                          padding-right: 10px;
                          padding-bottom: 0px;
                          padding-left: 5px;
                          border-style: solid;
                          border-left-width: 0px;
                          border-top-width: 0px;
                          border-bottom-width: 0px;
                          border-right-width: thin;
                          border-color: #818184;"
                      >
                        <a tabindex="-1" href="https://a55.tech">
                          <img
                            src="https://s3.amazonaws.com/dashboard-media-staging.access55.com/companies/a55/a55_logo_99x43_2019.png"
                            width="99"
                            height="43"
                            style="padding-top: 1px;"
                          />
                        </a>
                      </td>
                      <td style="vertical-align: top; padding-left: 10px;">
                        <a
                          v-if="!showEmail"
                          tabindex="-1"
                          :href="mail"
                          style="text-decoration: none; font-weight: 700; color: #0096ff;"
                        >
                          {{ name || "Rafael Abensur" }}
                        </a>
                        <span v-else style="font-weight: 700; color: #5b5b5f;">
                          {{ name || "Rafael Abensur" }}</span
                        >
                        -
                        <span style="font-weight: 400; color: #5b5b5f;">
                          {{ title || "Software Engineer" }}</span
                        >
                        <br v-if="address.trim().length" />
                        <span
                          v-if="address.trim().length"
                          style="color: #5b5b5f;"
                        >
                          {{ address }}</span
                        >
                        <br v-if="website.trim().length" />
                        <a
                          v-if="website.trim().length"
                          tabindex="-1"
                          :href="website"
                          style="color:#0096ff;"
                          target="_blank"
                        >
                          {{ website }}</a
                        >
                        <span v-if="showEmail && email.length"> | </span>
                        <a
                          v-if="showEmail"
                          tabindex="-1"
                          :href="mail"
                          style="color:#0096ff;"
                          target="_blank"
                        >
                          {{ email }}</a
                        >

                        <br />
                        <a tabindex="-1" :href="tel1" style="color:#0096ff;">
                          {{ phone1 || "+55 11 3816-4757" }}</a
                        >&nbsp;
                        <span v-if="phone2" style="color:#5b5b5f;">|&nbsp;</span
                        ><a tabindex="-1" :href="tel2" style="color:#0096FF;">{{
                          phone2
                        }}</a>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 md6 pa-2>
            <v-card class="elevation-1 signature__step">
              <img src="@/assets/step1.gif" />
            </v-card>
          </v-flex>
          <v-flex xs12 md6 pa-2>
            <v-card class="elevation-1 signature__step">
              <img src="@/assets/step2.gif" />
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar :timeout="1000" v-model="feedback" color="success">
      Copied!
    </v-snackbar>
  </v-app>
</template>
<script>
import AccessLogo from "@/components/Logo";
import Clipboard from "clipboard";
export default {
  components: {
    AccessLogo
  },
  data: () => ({
    feedback: false,
    showEmail: false,
    name: "",
    title: "",
    email: "rafael@a55.tech",
    address: "Rua Tavares Cabral, 102, 10º andar, Pinheiros, CEP 05423-030",
    website: "https://a55.tech",
    phone1: "+55 11 3816-4757",
    phone2: ""
  }),
  computed: {
    tel1() {
      return `tel:${this.phone1.replace(/ /g, "").replace(/\D/g, "")}`;
    },
    tel2() {
      return `tel:${this.phone2.replace(/ /g, "").replace(/\D/g, "")}`;
    },
    mail() {
      return `mailto:${this.email}`;
    }
  },
  mounted() {
    this.$refs.start.focus();

    const signatureClipboard = new Clipboard(".js-copy");

    const signatureHTMLClipboard = new Clipboard(".js-copy-src", {
      text: () => {
        return this.$refs.sourceWrapper.innerHTML;
      }
    });

    signatureClipboard.on("success", () => {
      this.feedback = true;
    });
    signatureHTMLClipboard.on("success", () => {
      this.feedback = true;
    });
  },
  props: {
    source: String
  }
};
</script>
<style lang="scss">
$primary: #3f88c9;
$copy: #2a3844;
$secondary: #c7c4f8;
$third: #665ef1;
$purple: $third;
$blue: $primary;
$black: $copy;

html {
  height: 100%;
  box-sizing: border-box;

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
}

body {
  margin: 0;
  padding: 0;
  background: #fafafa;
  color: $copy;
}

.signature {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;

  &__header {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-end;
    margin-top: 40px;

    span {
      color: $copy;
      font-family: "Open Sans";
      font-weight: 600;
      margin-left: 1rem;
    }
    svg {
      width: calc(408px / 4);
      height: calc(214px / 4);
    }
  }

  &__source {
    overflow: hidden;
    border: 2px dashed $secondary;
    height: 100%;
    display: flex;
    position: relative;
    > div {
      margin: auto;
      min-width: 400px;
    }
  }

  &__step {
    display: flex;
    img {
      width: 100%;
      height: auto;
      margin: auto;
      padding: 4px 4px;
    }
  }
}
</style>
